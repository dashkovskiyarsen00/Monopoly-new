import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/errorHandler';

export interface AuthRequest extends Request {
  userId?: string;
}

export const requireAuth = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header) {
    throw new ApiError('Unauthorized', 401);
  }
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new ApiError('Invalid token', 401);
  }
};

export const requireAdmin = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  if (req.headers['x-admin'] !== 'true') {
    throw new ApiError('Admin only', 403);
  }
  next();
};
