import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ALLOWED_ORIGINS: z.string().default(''),
  PAYMENT_WEBHOOK_SECRET: z.string().min(8).default('local-webhook-secret'),
  DOCKER_BIN: z.string().default('docker'),
  EXECUTION_IMAGE_NODE: z.string().default('node:20-alpine'),
  EXECUTION_IMAGE_PYTHON: z.string().default('python:3.12-alpine'),
  EXECUTION_DEFAULT_TIMEOUT_MS: z.coerce.number().int().positive().default(3000),
  EXECUTION_MAX_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
  EXECUTION_MEMORY_LIMIT_MB: z.coerce.number().int().positive().default(128),
  DEFAULT_ADMIN_EMAIL: z.string().email().default('admin@dsamaster.local'),
  DEFAULT_ADMIN_PASSWORD: z.string().min(12).default('Admin12345!@#'),
  DEFAULT_ADMIN_NAME: z.string().min(2).default('DSA Admin')
});

export const env = schema.parse(process.env);
