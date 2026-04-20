import bcrypt from 'bcryptjs';
import { db } from '../client.js';
import { env } from '../../config/env.js';

interface UserRow {
  id: string;
}

async function ensureAdminRole(userId: string): Promise<void> {
  await db.query(
    `
    INSERT INTO user_roles (user_id, role_id)
    SELECT $1, id FROM roles WHERE name = 'admin'
    ON CONFLICT (user_id, role_id) DO NOTHING
    `,
    [userId]
  );

  await db.query(
    `
    INSERT INTO user_roles (user_id, role_id)
    SELECT $1, id FROM roles WHERE name = 'user'
    ON CONFLICT (user_id, role_id) DO NOTHING
    `,
    [userId]
  );
}

async function run(): Promise<void> {
  const passwordHash = await bcrypt.hash(env.DEFAULT_ADMIN_PASSWORD, 12);

  const existingUser = await db.query<UserRow>(
    'SELECT id FROM users WHERE email = $1 LIMIT 1',
    [env.DEFAULT_ADMIN_EMAIL]
  );

  if (existingUser.rows[0]) {
    const userId = existingUser.rows[0].id;

    await db.query(
      `
      UPDATE users
      SET display_name = $1,
          password_hash = $2,
          updated_at = now()
      WHERE id = $3
      `,
      [env.DEFAULT_ADMIN_NAME, passwordHash, userId]
    );

    await ensureAdminRole(userId);

    console.log(`Updated existing admin user: ${env.DEFAULT_ADMIN_EMAIL}`);
  } else {
    const insertedUser = await db.query<UserRow>(
      `
      INSERT INTO users (email, password_hash, display_name)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [env.DEFAULT_ADMIN_EMAIL, passwordHash, env.DEFAULT_ADMIN_NAME]
    );

    const userId = insertedUser.rows[0]?.id;
    if (!userId) {
      throw new Error('Failed to create admin user');
    }

    await ensureAdminRole(userId);

    console.log(`Created admin user: ${env.DEFAULT_ADMIN_EMAIL}`);
  }

  console.log(`Admin password set from DEFAULT_ADMIN_PASSWORD for ${env.DEFAULT_ADMIN_EMAIL}`);
}

run()
  .catch(async (error: unknown) => {
    console.error('Admin seed failed:', error);
    await db.end();
    process.exit(1);
  })
  .finally(async () => {
    await db.end();
  });
