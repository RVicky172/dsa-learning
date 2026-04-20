import { Router } from 'express';
import { db } from '../../db/client.js';
import { authenticate } from '../../common/middleware/authenticate.js';

const router = Router();

interface UserRow {
  id: string;
  email: string;
  display_name: string;
}

interface RoleRow {
  name: string;
}

interface SubscriptionRow {
  plan_id: string;
}

router.get('/me', authenticate, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const userResult = await db.query<UserRow>(
    `
    SELECT id, email, display_name
    FROM users
    WHERE id = $1
    LIMIT 1
    `,
    [userId]
  );

  const user = userResult.rows[0];
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

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
  const subscriptionTier =
    planId === 'pro_yearly' ? 'pro_yearly' : planId === 'pro_monthly' ? 'pro_monthly' : 'free';

  res.status(200).json({
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    roles: rolesResult.rows.map((row) => row.name),
    subscriptionTier
  });
});

export default router;
