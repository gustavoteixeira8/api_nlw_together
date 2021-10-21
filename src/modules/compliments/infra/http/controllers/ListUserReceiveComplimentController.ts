import { ListUserReceiveComplimentUseCase } from '@modules/compliments/useCases/ListUserReceiveComplimentUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListUserReceiveComplimentController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.userData;

    const listCompliments = container.resolve(ListUserReceiveComplimentUseCase);

    const result = await listCompliments.execute({ userId });

    return res.status(200).json({ compliments: result, status: 200 });
  }
}
