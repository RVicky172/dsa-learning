import { Router } from 'express';
import { Gauge, Registry, collectDefaultMetrics } from 'prom-client';
import { logger } from '../../common/logging/logger.js';
import { db } from '../../db/client.js';

const router = Router();
const prometheusRegistry = new Registry();

collectDefaultMetrics({
  register: prometheusRegistry,
  prefix: 'dsa_backend_'
});

const dbPoolTotalGauge = new Gauge({
  name: 'dsa_backend_db_pool_total',
  help: 'Total connections in the PostgreSQL pool',
  registers: [prometheusRegistry]
});

const dbPoolIdleGauge = new Gauge({
  name: 'dsa_backend_db_pool_idle',
  help: 'Idle connections in the PostgreSQL pool',
  registers: [prometheusRegistry]
});

const dbPoolWaitingGauge = new Gauge({
  name: 'dsa_backend_db_pool_waiting',
  help: 'Requests waiting for a PostgreSQL pool connection',
  registers: [prometheusRegistry]
});

const appUptimeGauge = new Gauge({
  name: 'dsa_backend_app_uptime_seconds',
  help: 'Backend process uptime in seconds',
  registers: [prometheusRegistry]
});

const updateCustomMetrics = () => {
  dbPoolTotalGauge.set(db.totalCount);
  dbPoolIdleGauge.set(db.idleCount);
  dbPoolWaitingGauge.set(db.waitingCount);
  appUptimeGauge.set(process.uptime());
};

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

router.get('/metrics/prometheus', async (_req, res) => {
  try {
    updateCustomMetrics();
    res.setHeader('Content-Type', prometheusRegistry.contentType);
    res.status(200).send(await prometheusRegistry.metrics());
  } catch (error) {
    logger.error({ err: error }, 'prometheus metrics endpoint failed');
    res.status(500).json({ ok: false, message: 'metrics_unavailable' });
  }
});

export default router;
