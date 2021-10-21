import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { JsonWebTokenProvider } from '@shared/providers/tokenProvider/implementations/JsonWebTokenProvider';

export function ensureAuthentication(req: Request, res: Response, next: NextFunction): void {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError(['Missing authorization token'], 401);

    const [, token] = authorization.split(' ');

    const tokenProvider = container.resolve(JsonWebTokenProvider);

    const { userId, githubId } = tokenProvider.verify(token);

    req.userData = { userId, githubId };

    return next();
  } catch (e) {
    throw new AppError(['Invalid token'], 401);
  }
}
