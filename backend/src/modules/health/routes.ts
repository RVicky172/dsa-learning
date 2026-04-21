import { Router } from 'express';
import { logger } from '../../common/logging/logger.js';
import { db } from '../../db/client.js';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ ok: true, service: 'dsa-learning-backend' });
});

router.get('/ready', async (_req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({
      ok: true,
      service: 'dsa-learning-backend',
      checks: {
        database: 'up'
      },
      uptimeSeconds: Math.floor(process.uptime())
    });
  } catch (error) {
    logger.error({ err: error }, 'readiness check failed');
    res.status(503).json({
      ok: false,
      service: 'dsa-learning-backend',
      checks: {
        database: 'down'
      }
    });
  }
});

router.get('/metrics', (_req, res) => {
  const memory = process.memoryUsage();

  res.status(200).json({
    service: 'dsa-learning-backend',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    process: {
      pid: process.pid,
      nodeVersion: process.version
    },
    memoryBytes: {
      rss: memory.rss,
      heapTotal: memory.heapTotal,
      heapUsed: memory.heapUsed,
      external: memory.external
    },
    dbPool: {
      total: db.totalCount,
      idle: db.idleCount,
      waiting: db.waitingCount
    }
  });
});

export default router;
