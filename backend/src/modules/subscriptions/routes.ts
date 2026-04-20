import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { authenticate } from '../../common/middleware/authenticate.js';

const router = Router();

const checkoutSchema = z.object({
  planId: z.enum(['pro_monthly', 'pro_yearly'])
});

interface SubscriptionRow {
  plan_id: string;
  status: string;
  current_period_end: string | null;
}

router.get('/me', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const result = await db.query<SubscriptionRow>(
    `
    SELECT plan_id, status, current_period_end
    FROM subscriptions
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 1
    `,
    [userId]
  );

  const current = result.rows[0];
  if (!current) {
    res.status(200).json({ tier: 'free', status: 'none' });
    return;
  }

  const tier =
    current.plan_id === 'pro_yearly'
      ? 'pro_yearly'
      : current.plan_id === 'pro_monthly'
        ? 'pro_monthly'
        : 'free';

  res.status(200).json({
    tier,
    status: current.status,
    currentPeriodEnd: current.current_period_end ?? undefined
  });
});

router.post('/checkout-session', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid checkout payload' });
    return;
  }

  const planId = parsed.data.planId;

  const amountMinor = planId === 'pro_yearly' ? 7900 : 900;
  const sessionId = `mock_checkout_${randomUUID()}`;

  await db.query(
    `
    WITH new_subscription AS (
      INSERT INTO subscriptions (
        user_id,
        provider,
        plan_id,
        status,
        current_period_start,
        current_period_end,
        cancel_at_period_end,
        created_at,
        updated_at
      )
      VALUES (
        $1,
        'mock',
        $2,
        'none',
        NULL,
        NULL,
        false,
        now(),
        now()
      )
      RETURNING id
    )
    INSERT INTO payments (
      subscription_id,
      provider_payment_id,
      amount_minor,
      currency,
      status,
      paid_at,
      created_at
    )
    SELECT
      id,
      $3,
      $4,
      'USD',
      'pending',
      NULL,
      now()
    FROM new_subscription
    `,
    [userId, planId, sessionId, amountMinor]
  );

  res.status(201).json({
    checkoutUrl: `mock://checkout/${sessionId}`,
    checkoutSessionId: sessionId
  });
});

export default router;
