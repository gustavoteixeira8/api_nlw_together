import { ListAllTagsUseCase } from '@modules/tags/useCases/ListAllTagsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllTagsController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const createTag = container.resolve(ListAllTagsUseCase);

    const result = await createTag.execute();

    return res.status(200).json({ tags: result, status: 200 });
  }
}
