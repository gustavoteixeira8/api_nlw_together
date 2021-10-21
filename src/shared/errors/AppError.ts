import { ErrorProtocol } from './ErrorProtocol';

export class AppError extends Error implements ErrorProtocol {
  public error: string[];
  public statusCode: number;
  public name = 'AppError';

  constructor(error: string | string[], statusCode: number) {
    super();
    this.error = typeof error === 'string' ? [error] : error;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, AppError);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
