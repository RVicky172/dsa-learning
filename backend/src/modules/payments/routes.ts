import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { env } from '../../config/env.js';
import { authenticate } from '../../common/middleware/authenticate.js';

const router = Router();

const webhookEventSchema = z.object({
  type: z.literal('checkout.session.completed'),
  data: z.object({
    providerPaymentId: z.string().min(1)
  })
});

interface PaymentLookupRow {
  payment_id: string;
  subscription_id: string;
  user_id: string;
  plan_id: string;
  provider_payment_id: string;
}

async function activateSubscriptionByPaymentId(providerPaymentId: string): Promise<boolean> {
  const lookup = await db.query<PaymentLookupRow>(
    `
    SELECT
      p.id AS payment_id,
      p.subscription_id,
      s.user_id,
      s.plan_id,
      p.provider_payment_id
    FROM payments p
    INNER JOIN subscriptions s ON s.id = p.subscription_id
    WHERE p.provider_payment_id = $1
    LIMIT 1
    `,
    [providerPaymentId]
  );

  const row = lookup.rows[0];
  if (!row) {
    return false;
  }

  await db.query(
    `
    UPDATE subscriptions
    SET status = 'canceled', updated_at = now()
    WHERE user_id = $1
      AND status = 'active'
      AND id <> $2
    `,
    [row.user_id, row.subscription_id]
  );

  const periodExpression = row.plan_id === 'pro_yearly' ? "interval '1 year'" : "interval '1 month'";

  await db.query(
    `
    UPDATE subscriptions
    SET
      status = 'active',
      current_period_start = now(),
      current_period_end = now() + ${periodExpression},
      updated_at = now()
    WHERE id = $1
    `,
    [row.subscription_id]
  );

  await db.query(
    `
    UPDATE payments
    SET status = 'paid', paid_at = now()
    WHERE id = $1
    `,
    [row.payment_id]
  );

  return true;
}

router.post('/webhook', async (req, res) => {
  const webhookSecret = req.headers['x-webhook-secret'];
  if (webhookSecret !== env.PAYMENT_WEBHOOK_SECRET) {
    res.status(401).json({ message: 'Invalid webhook secret' });
    return;
  }

  const parsed = webhookEventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid webhook event' });
    return;
  }

  const handled = await activateSubscriptionByPaymentId(parsed.data.data.providerPaymentId);
  if (!handled) {
    res.status(404).json({ message: 'Unknown provider payment id' });
    return;
  }

  res.status(200).json({ message: 'Webhook processed' });
});

router.post('/mock/complete/:providerPaymentId', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const params = z.object({ providerPaymentId: z.string().min(1) }).safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: 'Invalid provider payment id' });
    return;
  }

  const owner = await db.query<{ user_id: string }>(
    `
    SELECT s.user_id
    FROM payments p
    INNER JOIN subscriptions s ON s.id = p.subscription_id
    WHERE p.provider_payment_id = $1
    LIMIT 1
    `,
    [params.data.providerPaymentId]
  );

  const row = owner.rows[0];
  if (!row) {
    res.status(404).json({ message: 'Checkout session not found' });
    return;
  }

  if (row.user_id !== userId) {
    res.status(403).json({ message: 'Checkout session does not belong to current user' });
    return;
  }

  const handled = await activateSubscriptionByPaymentId(params.data.providerPaymentId);
  if (!handled) {
    res.status(404).json({ message: 'Checkout session not found' });
    return;
  }

  res.status(200).json({ message: 'Mock checkout completed' });
});

export default router;
