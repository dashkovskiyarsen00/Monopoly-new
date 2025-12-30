import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errorHandler';

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new ApiError('Route not found', 404));
};
