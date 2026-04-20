import { Router } from 'express';
import { z } from 'zod';

import { authenticate } from '../../common/middleware/authenticate.js';
import { db } from '../../db/client.js';
import { enqueueExecution, getExecutionById, sanitizeTimeoutMs } from '../../queue/executionWorker.js';

const router = Router();

const executionStatusSchema = z.enum([
  'queued',
  'running',
  'completed',
  'runtime_error',
  'timeout',
  'failed'
]);

const listQuerySchema = z.object({
  problemId: z.string().uuid().optional(),
  language: z.enum(['javascript', 'python', 'typescript']).optional(),
  status: executionStatusSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20)
});

const runPayloadSchema = z.object({
  problemId: z.string().uuid().optional(),
  language: z.enum(['javascript', 'js', 'python', 'py', 'typescript', 'ts']),
  sourceCode: z.string().trim().min(1),
  stdin: z.string().default(''),
  timeoutMs: z.number().int().positive().optional(),
  waitForCompletion: z.boolean().default(true)
});

interface PremiumAccessRow {
  has_access: boolean;
}

interface ProblemAccessRow {
  id: string;
  is_premium: boolean;
}

interface ExecutionListRow {
  id: string;
  problem_id: string | null;
  language: string;
  source_hash: string | null;
  stdin: string;
  stdout: string;
  stderr: string;
  status: z.infer<typeof executionStatusSchema>;
  exit_code: number | null;
  runtime_ms: number | null;
  memory_kb: number | null;
  created_at: string;
  completed_at: string | null;
}

async function hasPremiumAccess(userId: string): Promise<boolean> {
  const accessResult = await db.query<PremiumAccessRow>(
    `
    SELECT (
      EXISTS (
        SELECT 1
        FROM user_roles ur
        INNER JOIN roles r ON r.id = ur.role_id
        WHERE ur.user_id = $1
          AND r.name IN ('admin', 'premium_user')
      )
      OR EXISTS (
        SELECT 1
        FROM subscriptions
        WHERE user_id = $1
          AND status = 'active'
          AND plan_id IN ('pro_monthly', 'pro_yearly')
          AND (current_period_end IS NULL OR current_period_end > now())
      )
    ) AS has_access
    `,
    [userId]
  );

  return Boolean(accessResult.rows[0]?.has_access);
}

function mapExecution(row: ExecutionListRow) {
  return {
    id: row.id,
    problemId: row.problem_id,
    language: row.language,
    sourceHash: row.source_hash,
    stdin: row.stdin,
    stdout: row.stdout,
    stderr: row.stderr,
    status: row.status,
    exitCode: row.exit_code,
    runtimeMs: row.runtime_ms,
    memoryKb: row.memory_kb,
    createdAt: row.created_at,
    completedAt: row.completed_at
  };
}

router.get('/', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid execution query parameters' });
    return;
  }

  const { page, pageSize, status, language, problemId } = parsed.data;
  const offset = (page - 1) * pageSize;

  const values: Array<string | number> = [userId];
  const where: string[] = ['user_id = $1'];

  if (problemId) {
    values.push(problemId);
    where.push(`problem_id = $${values.length}`);
  }

  if (language) {
    values.push(language);
    where.push(`language = $${values.length}`);
  }

  if (status) {
    values.push(status);
    where.push(`status = $${values.length}`);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

  const listValues = [...values, pageSize, offset];

  const [listResult, countResult] = await Promise.all([
    db.query<ExecutionListRow>(
      `
      SELECT
        id,
        problem_id,
        language,
        source_hash,
        stdin,
        stdout,
        stderr,
        status,
        exit_code,
        runtime_ms,
        memory_kb,
        created_at,
        completed_at
      FROM code_executions
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT $${listValues.length - 1}
      OFFSET $${listValues.length}
      `,
      listValues
    ),
    db.query<{ total: string }>(
      `
      SELECT COUNT(*)::text AS total
      FROM code_executions
      ${whereSql}
      `,
      values
    )
  ]);

  const total = Number(countResult.rows[0]?.total ?? '0');

  res.status(200).json({
    items: listResult.rows.map(mapExecution),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
  });
});

router.post('/run', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const parsed = runPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid execution payload' });
    return;
  }

  const language =
    parsed.data.language === 'js'
      ? 'javascript'
      : parsed.data.language === 'py'
        ? 'python'
        : parsed.data.language === 'ts'
          ? 'typescript'
        : parsed.data.language;

  if (parsed.data.problemId) {
    const problemResult = await db.query<ProblemAccessRow>(
      'SELECT id, is_premium FROM problems WHERE id = $1 LIMIT 1',
      [parsed.data.problemId]
    );

    const problem = problemResult.rows[0];
    if (!problem) {
      res.status(404).json({ message: 'Problem not found' });
      return;
    }

    if (problem.is_premium) {
      const canAccessPremium = await hasPremiumAccess(userId);
      if (!canAccessPremium) {
        res.status(403).json({ message: 'This problem requires a premium subscription' });
        return;
      }
    }
  }

  const queued = await enqueueExecution({
    userId,
    problemId: parsed.data.problemId,
    language,
    sourceCode: parsed.data.sourceCode,
    stdin: parsed.data.stdin,
    timeoutMs: sanitizeTimeoutMs(parsed.data.timeoutMs)
  });

  if (!parsed.data.waitForCompletion) {
    queued.result.catch(() => {
      // Failures are persisted by the worker. Avoid unhandled promise rejection.
    });

    res.status(202).json({
      id: queued.executionId,
      status: 'queued',
      message: 'Execution queued. Poll GET /execution/:executionId for status updates.'
    });
    return;
  }

  try {
    const result = await queued.result;

    res.status(200).json({
      id: result.id,
      status: result.status,
      stdout: result.stdout,
      stderr: result.stderr,
      runtimeMs: result.runtimeMs,
      exitCode: result.exitCode,
      memoryKb: result.memoryKb
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Execution failed';
    res.status(500).json({ message });
  }
});

router.get('/:executionId', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const params = z.object({ executionId: z.string().uuid() }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid execution id' });
    return;
  }

  const execution = await getExecutionById(params.data.executionId, userId);
  if (!execution) {
    res.status(404).json({ message: 'Execution not found' });
    return;
  }

  res.status(200).json({
    ...mapExecution(execution)
  });
});

export default router;
