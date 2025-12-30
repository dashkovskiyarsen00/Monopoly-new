import { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err: ApiError, req: Request, res: Response, _next: NextFunction): void => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Server error'
  });
};
