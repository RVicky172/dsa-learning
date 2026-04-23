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

interface PremiumAccessRow {
  has_access: boolean;
}

interface RecommendationRow {
  problem_id: string;
  topic_id: string;
  topic_title: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  is_premium: boolean;
  statement: string;
  mastery_score: number | null;
  has_topic_progress: boolean;
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

function buildRecommendationReason(row: RecommendationRow): string {
  if (!row.has_topic_progress) {
    return `Explore ${row.topic_title} with a guided starter problem`;
  }

  if (row.mastery_score === null || row.mastery_score < 40) {
    return `Strengthen your ${row.topic_title} fundamentals`;
  }

  if (row.mastery_score < 80) {
    return `Build momentum in ${row.topic_title}`;
  }

  return `Advance to the next ${row.topic_title} challenge`;
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

router.get('/me/recommendations', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const parsed = z
    .object({
      limit: z.coerce.number().int().min(1).max(12).default(6)
    })
    .safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid query parameters' });
    return;
  }

  const canAccessPremium = await hasPremiumAccess(userId);

  const result = await db.query<RecommendationRow>(
    `
    SELECT
      p.id AS problem_id,
      p.topic_id,
      t.title AS topic_title,
      p.title,
      p.difficulty,
      p.is_premium,
      p.statement,
      up.mastery_score,
      (up.user_id IS NOT NULL) AS has_topic_progress
    FROM problems p
    INNER JOIN topics t ON t.id = p.topic_id
    LEFT JOIN user_problem_progress upp
      ON upp.problem_id = p.id
      AND upp.user_id = $1
    LEFT JOIN user_progress up
      ON up.topic_id = p.topic_id
      AND up.user_id = $1
    WHERE t.is_published = true
      AND COALESCE(upp.completed, false) = false
      AND ($2::boolean = true OR p.is_premium = false)
    ORDER BY
      CASE WHEN up.user_id IS NULL THEN 1 ELSE 0 END ASC,
      COALESCE(up.mastery_score, 100) ASC,
      CASE p.difficulty WHEN 'Easy' THEN 0 WHEN 'Medium' THEN 1 ELSE 2 END ASC,
      p.created_at DESC
    LIMIT $3
    `,
    [userId, canAccessPremium, parsed.data.limit]
  );

  res.status(200).json({
    items: result.rows.map((row) => ({
      problemId: row.problem_id,
      topicId: row.topic_id,
      topicTitle: row.topic_title,
      title: row.title,
      difficulty: row.difficulty,
      isPremium: row.is_premium,
      canAccess: !row.is_premium || canAccessPremium,
      description: row.statement,
      reason: buildRecommendationReason(row)
    }))
  });
});

export default router;
