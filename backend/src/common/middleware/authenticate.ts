import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../auth/token.js';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing bearer token' });
    return;
  }

  const token = authHeader.slice('Bearer '.length).trim();

  try {
    const payload = verifyAccessToken(token);
    req.auth = { userId: payload.userId };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
