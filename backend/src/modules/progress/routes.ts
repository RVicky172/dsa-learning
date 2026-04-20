import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../common/middleware/authenticate.js';
import { db } from '../../db/client.js';

const router = Router();

interface TopicProgressRow {
  topic_id: string;
  attempted_count: number;
  solved_count: number;
  mastery_score: number;
}

interface CompletedProblemRow {
  problem_id: string;
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

router.get('/me', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const [topicProgressResult, completedProblemsResult] = await Promise.all([
    db.query<TopicProgressRow>(
      `
      SELECT topic_id, attempted_count, solved_count, mastery_score
      FROM user_progress
      WHERE user_id = $1
      ORDER BY updated_at DESC
      `,
      [userId]
    ),
    db.query<CompletedProblemRow>(
      `
      SELECT problem_id
      FROM user_problem_progress
      WHERE user_id = $1
        AND completed = true
      ORDER BY updated_at DESC
      `,
      [userId]
    )
  ]);

  res.status(200).json({
    topics: topicProgressResult.rows.map((row) => ({
      topicId: row.topic_id,
      attemptedCount: row.attempted_count,
      solvedCount: row.solved_count,
      masteryScore: row.mastery_score
    })),
    completedProblemIds: completedProblemsResult.rows.map((row) => row.problem_id)
  });
});

router.post('/me/problems/:problemId', authenticate, async (req, res) => {
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

  const body = z.object({ completed: z.boolean() }).safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ message: 'Invalid progress payload' });
    return;
  }

  const problemResult = await db.query<{ topic_id: string }>(
    'SELECT topic_id FROM problems WHERE id = $1 LIMIT 1',
    [params.data.problemId]
  );

  const problem = problemResult.rows[0];
  if (!problem) {
    res.status(404).json({ message: 'Problem not found' });
    return;
  }

  await db.query(
    `
    INSERT INTO user_problem_progress (user_id, problem_id, completed, completed_at, updated_at)
    VALUES ($1, $2, $3, CASE WHEN $3 THEN now() ELSE NULL END, now())
    ON CONFLICT (user_id, problem_id) DO UPDATE SET
      completed = EXCLUDED.completed,
      completed_at = CASE WHEN EXCLUDED.completed THEN now() ELSE NULL END,
      updated_at = now()
    `,
    [userId, params.data.problemId, body.data.completed]
  );

  await recomputeUserTopicProgress(userId, problem.topic_id);

  res.status(200).json({
    problemId: params.data.problemId,
    completed: body.data.completed
  });
});

export default router;
