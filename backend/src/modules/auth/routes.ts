import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { db } from '../../db/client.js';
import { signAccessToken } from '../../common/auth/token.js';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).max(80)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

interface RoleRow {
  name: string;
}

interface UserRow {
  id: string;
  email: string;
  display_name: string;
}

interface SubscriptionRow {
  plan_id: string;
}

async function buildAuthResponse(user: UserRow) {
  const rolesResult = await db.query<RoleRow>(
    `
    SELECT r.name
    FROM user_roles ur
    INNER JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = $1
    ORDER BY r.name ASC
    `,
    [user.id]
  );

  const subscriptionResult = await db.query<SubscriptionRow>(
    `
    SELECT plan_id
    FROM subscriptions
    WHERE user_id = $1
      AND status = 'active'
      AND (current_period_end IS NULL OR current_period_end > now())
    ORDER BY created_at DESC
    LIMIT 1
    `,
    [user.id]
  );

  const planId = subscriptionResult.rows[0]?.plan_id;

  return {
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      roles: rolesResult.rows.map((row) => row.name),
      subscriptionTier: planId === 'pro_yearly' ? 'pro_yearly' : planId === 'pro_monthly' ? 'pro_monthly' : 'free'
    },
    tokens: {
      accessToken: signAccessToken({ userId: user.id })
    }
  };
}

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid register payload' });
    return;
  }

  const { email, password, displayName } = parsed.data;

  const existing = await db.query<{ id: string }>('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
  if (existing.rows.length > 0) {
    res.status(409).json({ message: 'Email already registered' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const userInsert = await db.query<UserRow>(
    `
    INSERT INTO users (email, password_hash, display_name)
    VALUES ($1, $2, $3)
    RETURNING id, email, display_name
    `,
    [email, passwordHash, displayName]
  );

  const user = userInsert.rows[0];
  if (!user) {
    res.status(500).json({ message: 'Failed to create user' });
    return;
  }

  await db.query(
    `
    INSERT INTO user_roles (user_id, role_id)
    SELECT $1, id FROM roles WHERE name = 'user'
    ON CONFLICT (user_id, role_id) DO NOTHING
    `,
    [user.id]
  );

  const response = await buildAuthResponse(user);
  res.status(201).json(response);
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid login payload' });
    return;
  }

  const { email, password } = parsed.data;

  const userResult = await db.query<
    UserRow & { password_hash: string }
  >(
    `
    SELECT id, email, display_name, password_hash
    FROM users
    WHERE email = $1
    LIMIT 1
    `,
    [email]
  );

  const user = userResult.rows[0];
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const matches = await bcrypt.compare(password, user.password_hash);
  if (!matches) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const response = await buildAuthResponse(user);
  res.status(200).json(response);
});

router.post('/logout', (_req, res) => {
  // JWT flow is currently stateless; client removes token.
  res.status(200).json({ message: 'Logged out' });
});

router.post('/forgot-password', async (req, res) => {
  const parsed = forgotPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid forgot-password payload' });
    return;
  }

  // Keep a generic response to avoid user-email enumeration.
  res.status(200).json({ message: 'If the email exists, reset instructions have been queued.' });
});

export default router;
