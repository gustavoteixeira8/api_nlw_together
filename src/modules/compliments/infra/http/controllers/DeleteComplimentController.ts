import { DeleteComplimentUseCase } from '@modules/compliments/useCases/DeleteComplimentUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeleteComplimentController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { complimentId } = req.params;
    const { userId } = req.userData;

    const deleteCompliment = container.resolve(DeleteComplimentUseCase);

    await deleteCompliment.execute({ complimentId, userId });

    return res.status(204).json();
  }
}
