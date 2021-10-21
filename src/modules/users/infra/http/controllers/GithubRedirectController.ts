import { authConfig } from '@config/auth';
import { Request, Response } from 'express';

export class GithubRedirectController {
  public async execute(req: Request, res: Response): Promise<void> {
    const urlToRedirect = `https://github.com/login/oauth/authorize/?client_id=${authConfig.github.clientId}`;

    res.redirect(urlToRedirect);
  }
}
