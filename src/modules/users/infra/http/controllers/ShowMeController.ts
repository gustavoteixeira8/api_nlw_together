import { ShowUserUseCase } from '@modules/users/useCases/ShowUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowMeController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.userData;

    const showUser = container.resolve(ShowUserUseCase);

    const user = await showUser.execute({ userId });

    return res.status(200).json({ user, status: 200 });
  }
}
