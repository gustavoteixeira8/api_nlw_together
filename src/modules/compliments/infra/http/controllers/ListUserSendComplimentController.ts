import { ListUserSendComplimentUseCase } from '@modules/compliments/useCases/ListUserSendComplimentUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListUserSendComplimentController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.userData;

    const listCompliments = container.resolve(ListUserSendComplimentUseCase);

    const result = await listCompliments.execute({ userId });

    return res.status(200).json({ compliments: result, status: 200 });
  }
}
