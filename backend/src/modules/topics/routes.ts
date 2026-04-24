import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { optionalAuthenticate } from '../../common/middleware/optionalAuthenticate.js';

const router = Router();

interface TopicRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
}

interface ProblemRow {
  id: string;
  title: string;
  difficulty: string;
  statement: string;
  is_premium: boolean;
}

interface SolutionRow {
  id: string;
  language: string;
  approach: string;
  code: string;
  time_complexity: string;
  space_complexity: string;
  is_optimal: boolean;
}

interface HintRow {
  id: string;
  hint_text: string;
  sort_order: number;
}

interface ExampleRow {
  id: string;
  input_text: string;
  output_text: string;
  explanation: string;
  sort_order: number;
}

// GET all topics
router.get('/', async (_req, res) => {
  try {
    const result = await db.query<TopicRow>(
      `
      SELECT id, slug, title, description, order_index, is_published, created_at
      FROM topics
      WHERE is_published = true
      ORDER BY order_index ASC
      `
    );

    res.status(200).json({
      topics: result.rows.map(row => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description,
        orderIndex: row.order_index
      }))
    });
  } catch (error) {
    console.error('Error listing topics:', error);
    res.status(500).json({ message: 'Failed to list topics' });
  }
});

// GET topic by slug with all its problems and details
router.get('/by-slug/:slug', optionalAuthenticate, async (req, res) => {
  try {
    const { slug } = req.params;

    // Get topic
    const topicResult = await db.query<TopicRow>(
      `
      SELECT id, slug, title, description, order_index, is_published, created_at
      FROM topics
      WHERE slug = $1
      `,
      [slug]
    );

    const topic = topicResult.rows[0];
    if (!topic) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }

    // Get problems for topic
    const problemsResult = await db.query<ProblemRow>(
      `
      SELECT id, title, difficulty, statement, is_premium
      FROM problems
      WHERE topic_id = $1
      ORDER BY created_at ASC
      `,
      [topic.id]
    );

    res.status(200).json({
      id: topic.id,
      slug: topic.slug,
      title: topic.title,
      description: topic.description,
      orderIndex: topic.order_index,
      problems: problemsResult.rows.map(p => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty,
        description: p.statement,
        isPremium: p.is_premium
      }))
    });
  } catch (error) {
    console.error('Error getting topic by slug:', error);
    res.status(500).json({ message: 'Failed to get topic' });
  }
});

// GET topic by ID
router.get('/:topicId', optionalAuthenticate, async (req, res) => {
  try {
    const params = z.object({ topicId: z.string().uuid() }).safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ message: 'Invalid topic id' });
      return;
    }

    const topicResult = await db.query<TopicRow>(
      `
      SELECT id, slug, title, description, order_index, is_published, created_at
      FROM topics
      WHERE id = $1
      `,
      [params.data.topicId]
    );

    const topic = topicResult.rows[0];
    if (!topic) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }

    // Get problems for topic
    const problemsResult = await db.query<ProblemRow>(
      `
      SELECT id, title, difficulty, statement, is_premium
      FROM problems
      WHERE topic_id = $1
      ORDER BY created_at ASC
      `,
      [topic.id]
    );

    res.status(200).json({
      id: topic.id,
      slug: topic.slug,
      title: topic.title,
      description: topic.description,
      orderIndex: topic.order_index,
      problems: problemsResult.rows.map(p => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty,
        description: p.statement,
        isPremium: p.is_premium
      }))
    });
  } catch (error) {
    console.error('Error getting topic:', error);
    res.status(500).json({ message: 'Failed to get topic' });
  }
});

export default router;
