import { createHash, randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';

import { env } from '../config/env.js';
import { db } from '../db/client.js';
import { logger } from '../common/logging/logger.js';

type ExecutionStatus =
  | 'queued'
  | 'running'
  | 'completed'
  | 'runtime_error'
  | 'timeout'
  | 'failed';

interface ExecutionJobInput {
  userId: string;
  problemId?: string;
  language: 'javascript' | 'python' | 'typescript';
  sourceCode: string;
  stdin: string;
  timeoutMs: number;
}

interface ExecutionResult {
  id: string;
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  runtimeMs: number;
  exitCode: number | null;
  memoryKb?: number;
}

interface QueueJob {
  executionId: string;
  input: ExecutionJobInput;
  resolve: (value: ExecutionResult) => void;
  reject: (reason?: unknown) => void;
}

interface DockerExecResult {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  runtimeMs: number;
  exitCode: number | null;
}

interface LanguageRuntime {
  normalized: 'javascript' | 'python' | 'typescript';
  image: string;
  sourceFilename: string;
  command: string[];
}

function looksLikeTypeScript(sourceCode: string): boolean {
  // Heuristic fallback when client sends TS syntax with javascript language selected.
  return (
    /:\s*[A-Za-z_][A-Za-z0-9_<>,\[\]\| ]*/.test(sourceCode) ||
    /\binterface\s+[A-Za-z_][A-Za-z0-9_]*/.test(sourceCode) ||
    /\btype\s+[A-Za-z_][A-Za-z0-9_]*\s*=/.test(sourceCode) ||
    /\b(?:public|private|protected|readonly)\s+[A-Za-z_][A-Za-z0-9_]*/.test(sourceCode) ||
    /\b(?:enum|namespace|implements)\b/.test(sourceCode)
  );
}

function getLanguageRuntime(language: 'javascript' | 'python' | 'typescript'): LanguageRuntime {
  if (language === 'python') {
    return {
      normalized: 'python',
      image: env.EXECUTION_IMAGE_PYTHON,
      sourceFilename: 'main.py',
      command: ['python', '/workspace/main.py']
    };
  }

  if (language === 'typescript') {
    return {
      normalized: 'typescript',
      image: env.EXECUTION_IMAGE_NODE,
      sourceFilename: 'main.js',
      command: ['node', '/workspace/main.js']
    };
  }

  return {
    normalized: 'javascript',
    image: env.EXECUTION_IMAGE_NODE,
    sourceFilename: 'main.js',
    command: ['node', '/workspace/main.js']
  };
}

function transpileTypeScriptToNodeJs(sourceCode: string): string {
  const transpiled = ts.transpileModule(sourceCode, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      strict: false,
      sourceMap: false,
      inlineSourceMap: false,
      removeComments: false
    }
  });

  return transpiled.outputText;
}

function buildDockerArgs(runtime: LanguageRuntime, jobDir: string, memoryLimitMb: number): string[] {
  return [
    'run',
    '--rm',
    '--network',
    'none',
    '--memory',
    `${memoryLimitMb}m`,
    '--pids-limit',
    '128',
    '--cpus',
    '0.5',
    '--read-only',
    '--tmpfs',
    '/tmp:rw,noexec,nosuid,size=64m',
    '--mount',
    `type=bind,src=${jobDir},dst=/workspace,readonly`,
    runtime.image,
    ...runtime.command
  ];
}

async function executeInDocker(input: ExecutionJobInput): Promise<DockerExecResult> {
  const runtime = getLanguageRuntime(input.language);
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'dsa-exec-'));
  const sourcePath = path.join(tempDir, runtime.sourceFilename);
  const shouldTranspileToJs =
    runtime.normalized === 'typescript' ||
    (runtime.normalized === 'javascript' && looksLikeTypeScript(input.sourceCode));
  const preparedSourceCode =
    shouldTranspileToJs ? transpileTypeScriptToNodeJs(input.sourceCode) : input.sourceCode;

  await writeFile(sourcePath, preparedSourceCode, 'utf8');

  const args = buildDockerArgs(runtime, tempDir, env.EXECUTION_MEMORY_LIMIT_MB);

  const startedAt = process.hrtime.bigint();

  try {
    const result = await new Promise<DockerExecResult>((resolve, reject) => {
      const child = spawn(env.DOCKER_BIN, args, { stdio: ['pipe', 'pipe', 'pipe'] });

      let stdout = '';
      let stderr = '';
      let didTimeout = false;

      child.stdout.on('data', (chunk: Buffer | string) => {
        stdout += chunk.toString();
      });

      child.stderr.on('data', (chunk: Buffer | string) => {
        stderr += chunk.toString();
      });

      child.on('error', (error) => {
        reject(error);
      });

      const timer = setTimeout(() => {
        didTimeout = true;
        child.kill('SIGKILL');
      }, input.timeoutMs);

      if (input.stdin.trim().length > 0) {
        child.stdin.write(input.stdin);
      }
      child.stdin.end();

      child.on('close', (code) => {
        clearTimeout(timer);
        const runtimeMs = Number((process.hrtime.bigint() - startedAt) / 1000000n);

        if (didTimeout) {
          resolve({
            status: 'timeout',
            stdout,
            stderr: stderr || `Execution exceeded timeout (${input.timeoutMs} ms).`,
            runtimeMs,
            exitCode: null
          });
          return;
        }

        if (code === 0) {
          resolve({ status: 'completed', stdout, stderr, runtimeMs, exitCode: 0 });
          return;
        }

        resolve({
          status: 'runtime_error',
          stdout,
          stderr: stderr || `Process exited with code ${code ?? -1}`,
          runtimeMs,
          exitCode: code ?? null
        });
      });
    });

    return result;
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function persistQueuedExecution(input: ExecutionJobInput): Promise<string> {
  const id = randomUUID();
  const sourceHash = createHash('sha256').update(input.sourceCode).digest('hex');

  await db.query(
    `
    INSERT INTO code_executions (id, user_id, problem_id, language, source_code, source_hash, stdin, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, 'queued')
    `,
    [id, input.userId, input.problemId ?? null, input.language, input.sourceCode, sourceHash, input.stdin]
  );

  return id;
}

async function updateExecutionRunning(id: string): Promise<void> {
  await db.query('UPDATE code_executions SET status = $2 WHERE id = $1', [id, 'running']);
}

async function updateExecutionResult(id: string, result: DockerExecResult): Promise<void> {
  await db.query(
    `
    UPDATE code_executions
    SET
      status = $2,
      stdout = $3,
      stderr = $4,
      runtime_ms = $5,
      memory_kb = NULL,
      exit_code = $6,
      completed_at = now()
    WHERE id = $1
    `,
    [id, result.status, result.stdout, result.stderr, result.runtimeMs, result.exitCode]
  );
}

async function updateExecutionFailure(id: string, errorMessage: string): Promise<void> {
  await db.query(
    `
    UPDATE code_executions
    SET
      status = $2,
      stdout = '',
      stderr = $3,
      runtime_ms = NULL,
      memory_kb = NULL,
      exit_code = NULL,
      completed_at = now()
    WHERE id = $1
    `,
    [id, 'failed', errorMessage]
  );
}

const jobQueue: QueueJob[] = [];
const MAX_QUEUE_DEPTH = 50;
let isProcessing = false;

async function processQueue(): Promise<void> {
  if (isProcessing) {
    return;
  }

  isProcessing = true;

  while (jobQueue.length > 0) {
    const job = jobQueue.shift();
    if (!job) {
      continue;
    }

    try {
      await updateExecutionRunning(job.executionId);

      const result = await executeInDocker(job.input);
      await updateExecutionResult(job.executionId, result);

      job.resolve({
        id: job.executionId,
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr,
        runtimeMs: result.runtimeMs,
        exitCode: result.exitCode
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Execution failed unexpectedly';

      logger.error({ error }, 'execution worker failed to process job');

      await updateExecutionFailure(job.executionId, errorMessage);

      job.reject(error instanceof Error ? error : new Error(errorMessage));
    }
  }

  isProcessing = false;
}

export function sanitizeTimeoutMs(timeoutMs?: number): number {
  if (!timeoutMs || !Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return env.EXECUTION_DEFAULT_TIMEOUT_MS;
  }

  return Math.min(Math.floor(timeoutMs), env.EXECUTION_MAX_TIMEOUT_MS);
}

export async function enqueueExecution(
  input: ExecutionJobInput
): Promise<{ executionId: string; result: Promise<ExecutionResult> }> {
  if (jobQueue.length >= MAX_QUEUE_DEPTH) {
    throw new Error('Execution queue is at capacity. Please try again shortly.');
  }

  const executionId = await persistQueuedExecution(input);

  const result = new Promise<ExecutionResult>((resolve, reject) => {
    jobQueue.push({ executionId, input, resolve, reject });
    void processQueue();
  });

  return { executionId, result };
}

interface CodeExecutionRow {
  id: string;
  user_id: string;
  problem_id: string | null;
  language: string;
  source_hash: string | null;
  stdin: string;
  stdout: string;
  stderr: string;
  status: ExecutionStatus;
  exit_code: number | null;
  runtime_ms: number | null;
  memory_kb: number | null;
  created_at: string;
  completed_at: string | null;
}

export async function getExecutionById(executionId: string, userId: string): Promise<CodeExecutionRow | null> {
  const result = await db.query<CodeExecutionRow>(
    `
    SELECT
      id,
      user_id,
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
    WHERE id = $1
      AND user_id = $2
    LIMIT 1
    `,
    [executionId, userId]
  );

  return result.rows[0] ?? null;
}
