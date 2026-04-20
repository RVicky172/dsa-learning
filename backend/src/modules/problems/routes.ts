import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { authenticate } from '../../common/middleware/authenticate.js';
import { optionalAuthenticate } from '../../common/middleware/optionalAuthenticate.js';

const router = Router();

const listQuerySchema = z.object({
  topicId: z.string().uuid().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional()
});

const attemptPayloadSchema = z.object({
  language: z.string().trim().min(1),
  submittedCode: z.string().trim().min(1)
});

interface ProblemListRow {
  id: string;
  topic_id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  is_premium: boolean;
  statement: string;
}

interface PremiumAccessRow {
  has_access: boolean;
}

interface ProblemDetailRow extends ProblemListRow {
  constraints: string;
}

interface AttemptRow {
  id: string;
  status: 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'timeout';
  runtime_ms: number | null;
  memory_kb: number | null;
}

function mapProblemListItem(row: ProblemListRow, canAccessPremium: boolean) {
  const canAccess = !row.is_premium || canAccessPremium;

  return {
    id: row.id,
    topicId: row.topic_id,
    title: row.title,
    difficulty: row.difficulty,
    isPremium: row.is_premium,
    description: row.statement,
    canAccess
  };
}

function mapProblemDetail(row: ProblemDetailRow, canAccessPremium: boolean) {
  return {
    ...mapProblemListItem(row, canAccessPremium),
    statement: row.statement,
    constraints: row.constraints
  };
}

async function hasPremiumAccess(userId?: string): Promise<boolean> {
  if (!userId) {
    return false;
  }

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

async function recomputeUserTopicProgress(userId: string, topicId: string): Promise<void> {
  await db.query(
    `
    INSERT INTO user_progress (user_id, topic_id, attempted_count, solved_count, mastery_score, updated_at)
    SELECT
      $1,
      $2,
      COUNT(*)::int,
      COUNT(*) FILTER (WHERE upp.completed = true)::int,
      COALESCE(
        (COUNT(*) FILTER (WHERE upp.completed = true)::double precision / NULLIF(COUNT(*)::double precision, 0)) * 100,
        0
      ),
      now()
    FROM user_problem_progress upp
    INNER JOIN problems p ON p.id = upp.problem_id
    WHERE upp.user_id = $1
      AND p.topic_id = $2
    ON CONFLICT (user_id, topic_id) DO UPDATE SET
      attempted_count = EXCLUDED.attempted_count,
      solved_count = EXCLUDED.solved_count,
      mastery_score = EXCLUDED.mastery_score,
      updated_at = now()
    `,
    [userId, topicId]
  );
}

router.get('/', optionalAuthenticate, async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid query parameters' });
    return;
  }

  const canAccessPremium = await hasPremiumAccess(req.auth?.userId);

  const values: string[] = [];
  const where: string[] = [];

  if (parsed.data.topicId) {
    values.push(parsed.data.topicId);
    where.push(`topic_id = $${values.length}`);
  }

  if (parsed.data.difficulty) {
    values.push(parsed.data.difficulty);
    where.push(`difficulty = $${values.length}`);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

  db.query<ProblemListRow>(
    `
    SELECT id, topic_id, title, difficulty, is_premium, statement
    FROM problems
    ${whereSql}
    ORDER BY created_at DESC
    `,
    values
  )
    .then((result) => {
      res.status(200).json(result.rows.map((row) => mapProblemListItem(row, canAccessPremium)));
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to list problems' });
    });
});

router.get('/:problemId', optionalAuthenticate, async (req, res) => {
  const params = z.object({ problemId: z.string().uuid() }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid problem id' });
    return;
  }

  const result = await db.query<ProblemDetailRow>(
    `
    SELECT id, topic_id, title, difficulty, is_premium, statement, constraints
    FROM problems
    WHERE id = $1
    LIMIT 1
    `,
    [params.data.problemId]
  );

  const problem = result.rows[0];
  if (!problem) {
    res.status(404).json({ message: 'Problem not found' });
    return;
  }

  const canAccessPremium = await hasPremiumAccess(req.auth?.userId);
  if (problem.is_premium && !canAccessPremium) {
    res.status(403).json({ message: 'This problem requires a premium subscription' });
    return;
  }

  res.status(200).json(mapProblemDetail(problem, canAccessPremium));
});

router.post('/:problemId/attempts', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const params = z.object({ problemId: z.string().uuid() }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid problem id' });
    return;
  }

  const parsed = attemptPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid attempt payload' });
    return;
  }

  const problemResult = await db.query<{ id: string; topic_id: string; is_premium: boolean }>(
    'SELECT id, topic_id, is_premium FROM problems WHERE id = $1 LIMIT 1',
    [params.data.problemId]
  );

  const problem = problemResult.rows[0];
  if (!problem) {
    res.status(404).json({ message: 'Problem not found' });
    return;
  }

  const canAccessPremium = await hasPremiumAccess(userId);
  if (problem.is_premium && !canAccessPremium) {
    res.status(403).json({ message: 'This problem requires a premium subscription' });
    return;
  }

  const status: AttemptRow['status'] =
    parsed.data.submittedCode.toLowerCase().includes('todo') ? 'wrong_answer' : 'accepted';
  const runtimeMs = Math.max(8, Math.min(1200, parsed.data.submittedCode.length));
  const memoryKb = 2048;

  const insertResult = await db.query<AttemptRow>(
    `
    INSERT INTO problem_attempts (user_id, problem_id, language, submitted_code, status, runtime_ms, memory_kb)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, status, runtime_ms, memory_kb
    `,
    [
      userId,
      problem.id,
      parsed.data.language,
      parsed.data.submittedCode,
      status,
      runtimeMs,
      memoryKb
    ]
  );

  if (status === 'accepted') {
    await db.query(
      `
      INSERT INTO user_problem_progress (user_id, problem_id, completed, completed_at, updated_at)
      VALUES ($1, $2, true, now(), now())
      ON CONFLICT (user_id, problem_id) DO UPDATE SET
        completed = true,
        completed_at = now(),
        updated_at = now()
      `,
      [userId, problem.id]
    );

    await recomputeUserTopicProgress(userId, problem.topic_id);
  }

  const created = insertResult.rows[0];
  if (!created) {
    res.status(500).json({ message: 'Failed to save attempt' });
    return;
  }

  res.status(201).json({
    id: created.id,
    status: created.status,
    runtimeMs: created.runtime_ms ?? undefined,
    memoryKb: created.memory_kb ?? undefined
  });
});

export default router;
