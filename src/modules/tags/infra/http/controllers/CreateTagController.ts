import { CreateTagUseCase } from '@modules/tags/useCases/CreateTagUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateTagController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { name } = req.body;
    const { userId } = req.userData;

    const createTag = container.resolve(CreateTagUseCase);

    const result = await createTag.execute({ name, userId });

    return res.status(200).json({ tag: result, status: 200 });
  }
}
