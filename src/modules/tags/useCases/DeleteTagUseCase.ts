import { UserRepositoryProtocol } from '@modules/users/domain/repositories/UserRepositoryProtocol';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { TagRepositoryProtocol } from '../domain/repositories/TagRepositoryProtocol';
import { DeleteTagRequest } from '../domain/useCases/DeleteTagRequest';

@injectable()
export class DeleteTagUseCase {
  constructor(
    @inject('TagRepository')
    private readonly _tagRepository: TagRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ tagId, userId }: DeleteTagRequest): Promise<void> {
    if (!tagId || !userId) throw new AppError('Tag id and user id are required', 400);

    const tagExists = await this._tagRepository.findById(tagId);

    if (!tagExists) throw new AppError('Tag not found', 404);

    const userExists = await this._userRepository.findById(userId);

    if (tagExists.userId !== null && userExists && tagExists.userId !== userExists.id) {
      throw new AppError('You cannot delete this tag', 400);
    }

    await this._tagRepository.delete(tagId);
  }
}
