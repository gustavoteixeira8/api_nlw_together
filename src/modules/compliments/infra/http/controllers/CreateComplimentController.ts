import { CreateComplimentUseCase } from '@modules/compliments/useCases/CreateComplimentUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateComplimentController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { message, userReceiverId, tagId } = req.body;
    const { userId: userSenderId } = req.userData;

    const createCompliment = container.resolve(CreateComplimentUseCase);

    const result = await createCompliment.execute({ message, userReceiverId, tagId, userSenderId });

    return res.status(200).json({ compliment: result, status: 200 });
  }
}
