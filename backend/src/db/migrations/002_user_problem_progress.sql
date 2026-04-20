-- 002_user_problem_progress.sql
-- Track per-user completion status for each problem.

CREATE TABLE IF NOT EXISTS user_problem_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, problem_id)
);

CREATE INDEX IF NOT EXISTS idx_user_problem_progress_user
  ON user_problem_progress (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_problem_progress_problem
  ON user_problem_progress (problem_id);
