import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../auth/token.js';

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.slice('Bearer '.length).trim();

  try {
    const payload = verifyAccessToken(token);
    req.auth = { userId: payload.userId };
  } catch {
    // Keep request unauthenticated when optional auth token is invalid.
  }

  next();
}
