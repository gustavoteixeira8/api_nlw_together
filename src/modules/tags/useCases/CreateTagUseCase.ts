import { UserRepositoryProtocol } from '@modules/users/domain/repositories/UserRepositoryProtocol';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { TagRepositoryProtocol } from '../domain/repositories/TagRepositoryProtocol';
import { CreateTagRequest } from '../domain/useCases/CreateTagRequest';
import { Tag } from '../domain/entities/Tag';

@injectable()
export class CreateTagUseCase {
  constructor(
    @inject('TagRepository')
    private readonly _tagRepository: TagRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ name, userId }: CreateTagRequest): Promise<Tag | never> {
    if (!name || !userId) throw new AppError('Name and user id are required', 400);

    const nameConstraints = typeof name === 'string' && name.length > 1 && name.length < 255;

    if (!nameConstraints) throw new AppError('Name must be between 1 and 255 characters', 400);

    const userExists = await this._userRepository.findById(userId);

    if (!userExists) throw new AppError('User not found', 404);

    const tagAlreadyExists = await this._tagRepository.findByName(name);

    if (tagAlreadyExists) throw new AppError('Tag already exists', 400);

    const date = new Date();

    const tag = await this._tagRepository.create({
      userId,
      name,
      createdAt: date,
      updatedAt: date,
    });

    return tag;
  }
}
