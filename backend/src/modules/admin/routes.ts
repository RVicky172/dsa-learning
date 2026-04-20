import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireAdmin } from '../../common/middleware/requireAdmin.js';

const router = Router();

const topicCreateSchema = z.object({
  slug: z.string().trim().min(2).max(120),
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().min(2),
  orderIndex: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true)
});

const topicUpdateSchema = topicCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: 'At least one field is required to update a topic' }
);

const difficultySchema = z.enum(['Easy', 'Medium', 'Hard']);

const problemCreateSchema = z.object({
  topicId: z.string().uuid(),
  slug: z.string().trim().min(2).max(120),
  title: z.string().trim().min(2).max(200),
  difficulty: difficultySchema,
  isPremium: z.boolean().default(false),
  statement: z.string().trim().min(5),
  constraints: z.string().trim().default('')
});

const problemUpdateSchema = problemCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: 'At least one field is required to update a problem' }
);

interface TopicRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface ProblemRow {
  id: string;
  topic_id: string;
  topic_title: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  is_premium: boolean;
  statement: string;
  constraints: string;
  created_at: string;
  updated_at: string;
}

function isPgError(error: unknown): error is { code?: string } {
  return Boolean(error && typeof error === 'object' && 'code' in error);
}

function mapTopic(row: TopicRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    orderIndex: row.order_index,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapProblem(row: ProblemRow) {
  return {
    id: row.id,
    topicId: row.topic_id,
    topicTitle: row.topic_title,
    slug: row.slug,
    title: row.title,
    difficulty: row.difficulty,
    isPremium: row.is_premium,
    statement: row.statement,
    constraints: row.constraints,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

router.get('/overview', authenticate, requireAdmin, async (_req, res) => {
  const [users, problems, topics, attempts] = await Promise.all([
    db.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM users'),
    db.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM problems'),
    db.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM topics'),
    db.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM problem_attempts')
  ]);

  res.status(200).json({
    users: Number(users.rows[0]?.count ?? '0'),
    problems: Number(problems.rows[0]?.count ?? '0'),
    topics: Number(topics.rows[0]?.count ?? '0'),
    attempts: Number(attempts.rows[0]?.count ?? '0')
  });
});

router.get('/topics', authenticate, requireAdmin, async (_req, res) => {
  const topics = await db.query<TopicRow>(
    `
    SELECT id, slug, title, description, order_index, is_published, created_at, updated_at
    FROM topics
    ORDER BY order_index ASC, created_at DESC
    `
  );

  res.status(200).json({ items: topics.rows.map(mapTopic) });
});

router.post('/topics', authenticate, requireAdmin, async (req, res) => {
  const parsed = topicCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid topic payload' });
    return;
  }

  const { slug, title, description, orderIndex, isPublished } = parsed.data;

  try {
    const insertResult = await db.query<TopicRow>(
      `
      INSERT INTO topics (slug, title, description, order_index, is_published)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, slug, title, description, order_index, is_published, created_at, updated_at
      `,
      [slug, title, description, orderIndex, isPublished]
    );

    const topic = insertResult.rows[0];
    if (!topic) {
      res.status(500).json({ message: 'Failed to create topic' });
      return;
    }

    res.status(201).json(mapTopic(topic));
  } catch (error) {
    if (isPgError(error) && error.code === '23505') {
      res.status(409).json({ message: 'A topic with this slug already exists' });
      return;
    }
    throw error;
  }
});

router.patch('/topics/:topicId', authenticate, requireAdmin, async (req, res) => {
  const params = z.object({ topicId: z.string().uuid() }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid topic id' });
    return;
  }

  const parsed = topicUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid topic payload' });
    return;
  }

  const updates = parsed.data;
  const entries = Object.entries(updates);
  const columns: string[] = [];
  const values: Array<string | number | boolean> = [];

  entries.forEach(([key, value], index) => {
    const column =
      key === 'orderIndex' ? 'order_index' :
      key === 'isPublished' ? 'is_published' :
      key;
    columns.push(`${column} = $${index + 1}`);
    values.push(value as string | number | boolean);
  });

  values.push(params.data.topicId);

  try {
    const updateResult = await db.query<TopicRow>(
      `
      UPDATE topics
      SET ${columns.join(', ')}, updated_at = now()
      WHERE id = $${values.length}
      RETURNING id, slug, title, description, order_index, is_published, created_at, updated_at
      `,
      values
    );

    const topic = updateResult.rows[0];
    if (!topic) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }

    res.status(200).json(mapTopic(topic));
  } catch (error) {
    if (isPgError(error) && error.code === '23505') {
      res.status(409).json({ message: 'A topic with this slug already exists' });
      return;
    }
    throw error;
  }
});

router.delete('/topics/:topicId', authenticate, requireAdmin, async (req, res) => {
  const params = z.object({ topicId: z.string().uuid() }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid topic id' });
    return;
  }

  const deleteResult = await db.query<{ id: string }>(
    'DELETE FROM topics WHERE id = $1 RETURNING id',
    [params.data.topicId]
  );

  if (deleteResult.rows.length === 0) {
    res.status(404).json({ message: 'Topic not found' });
    return;
  }

  res.status(204).send();
});

router.get('/problems', authenticate, requireAdmin, async (req, res) => {
  const query = z.object({ topicId: z.string().uuid().optional() }).safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ message: 'Invalid query parameters' });
    return;
  }

  const values: string[] = [];
  let whereSql = '';

  if (query.data.topicId) {
    values.push(query.data.topicId);
    whereSql = `WHERE p.topic_id = $${values.length}`;
  }

  const problems = await db.query<ProblemRow>(
    `
    SELECT
      p.id,
      p.topic_id,
      t.title AS topic_title,
      p.slug,
      p.title,
      p.difficulty,
      p.is_premium,
      p.statement,
      p.constraints,
      p.created_at,
      p.updated_at
    FROM problems p
    INNER JOIN topics t ON t.id = p.topic_id
    ${whereSql}
    ORDER BY p.updated_at DESC
    `,
    values
  );

  res.status(200).json({ items: problems.rows.map(mapProblem) });
});

router.post('/problems', authenticate, requireAdmin, async (req, res) => {
  const parsed = problemCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid problem payload' });
    return;
  }

  const { topicId, slug, title, difficulty, isPremium, statement, constraints } = parsed.data;

  try {
    const insertResult = await db.query<ProblemRow>(
      `
      INSERT INTO problems (topic_id, slug, title, difficulty, is_premium, statement, constraints, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        id,
        topic_id,
        ''::text AS topic_title,
        slug,
        title,
        difficulty,
        is_premium,
        statement,
        constraints,
        created_at,
        updated_at
      `,
      [topicId, slug, title, difficulty, isPremium, statement, constraints, req.auth?.userId ?? null]
    );

    const inserted = insertResult.rows[0];
    if (!inserted) {
      res.status(500).json({ message: 'Failed to create problem' });
      return;
    }

    const withTopic = await db.query<ProblemRow>(
      `
      SELECT
        p.id,
        p.topic_id,
        t.title AS topic_title,
        p.slug,
        p.title,
        p.difficulty,
        p.is_premium,
        p.statement,
        p.constraints,
        p.created_at,
        p.updated_at
      FROM problems p
      INNER JOIN topics t ON t.id = p.topic_id
      WHERE p.id = $1
      LIMIT 1
      `,
      [inserted.id]
    );

    res.status(201).json(mapProblem(withTopic.rows[0] ?? inserted));
  } catch (error) {
    if (isPgError(error) && error.code === '23505') {
      res.status(409).json({ message: 'A problem with this slug already exists' });
      return;
    }
    if (isPgError(error) && error.code === '23503') {
      res.status(400).json({ message: 'Topic not found for this problem' });
      return;
    }
    throw error;
  }
});

router.patch('/problems/:problemId', authenticate, requireAdmin, async (req, res) => {
  const params = z.object({ problemId: z.string().uuid() }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid problem id' });
    return;
  }

  const parsed = problemUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid problem payload' });
    return;
  }

  const updates = parsed.data;
  const entries = Object.entries(updates);
  const columns: string[] = [];
  const values: Array<string | boolean> = [];

  entries.forEach(([key, value], index) => {
    const column =
      key === 'topicId' ? 'topic_id' :
      key === 'isPremium' ? 'is_premium' :
      key;
    columns.push(`${column} = $${index + 1}`);
    values.push(value as string | boolean);
  });

  values.push(params.data.problemId);

  try {
    const updateResult = await db.query<ProblemRow>(
      `
      UPDATE problems
      SET ${columns.join(', ')}, updated_at = now()
      WHERE id = $${values.length}
      RETURNING
        id,
        topic_id,
        ''::text AS topic_title,
        slug,
        title,
        difficulty,
        is_premium,
        statement,
        constraints,
        created_at,
        updated_at
      `,
      values
    );

    const updated = updateResult.rows[0];
    if (!updated) {
      res.status(404).json({ message: 'Problem not found' });
      return;
    }

    const withTopic = await db.query<ProblemRow>(
      `
      SELECT
        p.id,
        p.topic_id,
        t.title AS topic_title,
        p.slug,
        p.title,
        p.difficulty,
        p.is_premium,
        p.statement,
        p.constraints,
        p.created_at,
        p.updated_at
      FROM problems p
      INNER JOIN topics t ON t.id = p.topic_id
      WHERE p.id = $1
      LIMIT 1
      `,
      [updated.id]
    );

    res.status(200).json(mapProblem(withTopic.rows[0] ?? updated));
  } catch (error) {
    if (isPgError(error) && error.code === '23505') {
      res.status(409).json({ message: 'A problem with this slug already exists' });
      return;
    }
    if (isPgError(error) && error.code === '23503') {
      res.status(400).json({ message: 'Topic not found for this problem' });
      return;
    }
    throw error;
  }
});

router.delete('/problems/:problemId', authenticate, requireAdmin, async (req, res) => {
  const params = z.object({ problemId: z.string().uuid() }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid problem id' });
    return;
  }

  const deleteResult = await db.query<{ id: string }>(
    'DELETE FROM problems WHERE id = $1 RETURNING id',
    [params.data.problemId]
  );

  if (deleteResult.rows.length === 0) {
    res.status(404).json({ message: 'Problem not found' });
    return;
  }

  res.status(204).send();
});

export default router;
