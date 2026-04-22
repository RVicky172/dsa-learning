import type { NextFunction, Request, Response } from 'express';
import { db } from '../../db/client.js';

interface RoleRow {
  name: string;
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  let roleRows: RoleRow[];
  try {
    const rolesResult = await db.query<RoleRow>(
      `
      SELECT r.name
      FROM user_roles ur
      INNER JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = $1
      `,
      [userId]
    );
    roleRows = rolesResult.rows;
  } catch {
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  const isAdmin = roleRows.some((row) => row.name === 'admin');
  if (!isAdmin) {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }

  next();
}
