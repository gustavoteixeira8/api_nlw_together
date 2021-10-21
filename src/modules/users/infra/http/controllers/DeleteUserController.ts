import { DeleteUserUseCase } from '@modules/users/useCases/DeleteUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeleteUserController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.userData;

    const deleteUser = container.resolve(DeleteUserUseCase);

    await deleteUser.execute({ userId });

    return res.status(204).json();
  }
}
