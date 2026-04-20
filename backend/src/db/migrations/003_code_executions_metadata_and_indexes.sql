-- 003_code_executions_metadata_and_indexes.sql
-- Expand execution persistence metadata and query indexes for history APIs.

ALTER TABLE code_executions
  ADD COLUMN IF NOT EXISTS source_hash TEXT,
  ADD COLUMN IF NOT EXISTS exit_code INTEGER,
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_code_executions_user_status_created_at
  ON code_executions (user_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_code_executions_user_problem_created_at
  ON code_executions (user_id, problem_id, created_at DESC);
