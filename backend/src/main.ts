import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { env } from './config/env.js';
import { logger } from './common/logging/logger.js';
import healthRoutes from './modules/health/routes.js';
import authRoutes from './modules/auth/routes.js';
import userRoutes from './modules/users/routes.js';
import topicRoutes from './modules/topics/routes.js';
import problemRoutes from './modules/problems/routes.js';
import progressRoutes from './modules/progress/routes.js';
import subscriptionRoutes from './modules/subscriptions/routes.js';
import adminRoutes from './modules/admin/routes.js';
import executionRoutes from './modules/execution/routes.js';
import paymentRoutes from './modules/payments/routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger }));

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'DSA Learning API' });
});

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/topics', topicRoutes);
app.use('/problems', problemRoutes);
app.use('/progress', progressRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/admin', adminRoutes);
app.use('/execution', executionRoutes);
app.use('/payments', paymentRoutes);

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'backend started');
});
