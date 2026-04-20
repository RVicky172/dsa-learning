import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  PAYMENT_WEBHOOK_SECRET: z.string().min(8).default('local-webhook-secret'),
  DEFAULT_ADMIN_EMAIL: z.string().email().default('admin@dsamaster.local'),
  DEFAULT_ADMIN_PASSWORD: z.string().min(8).default('Admin12345'),
  DEFAULT_ADMIN_NAME: z.string().min(2).default('DSA Admin')
});

export const env = schema.parse(process.env);
