import { DeleteTagUseCase } from '@modules/tags/useCases/DeleteTagUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeleteTagController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { tagId } = req.params;
    const { userId } = req.userData;

    const deleteTag = container.resolve(DeleteTagUseCase);

    await deleteTag.execute({ tagId, userId });

    return res.status(204).json();
  }
}
