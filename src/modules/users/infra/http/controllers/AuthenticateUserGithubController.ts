import { AuthenticateUserGithubUseCase } from '@modules/users/useCases/AuthenticateUserGithubUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserGithubController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { code } = req.body;

    const authUser = container.resolve(AuthenticateUserGithubUseCase);

    const result = await authUser.execute({ code: code as string });

    return res.status(200).json({ user: result.user, token: result.token, status: 200 });
  }
}
