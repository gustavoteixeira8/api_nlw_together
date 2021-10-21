import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line
): Response {
  console.log(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.error,
      statusCode: error.statusCode,
      name: error.name,
    });
  }

  return res.status(500).json({
    error: 'Internal server error',
    statusCode: 500,
    name: 'InternalServerError',
  });
}
