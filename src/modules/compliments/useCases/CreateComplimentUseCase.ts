import { TagRepositoryProtocol } from '@modules/tags/domain/repositories/TagRepositoryProtocol';
import { UserRepositoryProtocol } from '@modules/users/domain/repositories/UserRepositoryProtocol';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Compliment } from '../domain/entities/Compliment';
import { ComplimentRepositoryProtocol } from '../domain/repositories/ComplimentRepositoryProtocol';
import { CreateComplimentRequest } from '../domain/useCases/CreateComplimentRequest';

@injectable()
export class CreateComplimentUseCase {
  constructor(
    @inject('ComplimentRepository')
    private readonly _complimentRepository: ComplimentRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('TagRepository')
    private readonly _tagRepository: TagRepositoryProtocol,
  ) {}

  public async execute({
    message,
    tagId,
    userReceiverId,
    userSenderId,
  }: CreateComplimentRequest): Promise<Compliment | never> {
    if (!message || !tagId || !userReceiverId || !userSenderId) {
      throw new AppError(
        `'message', 'tagId', 'userReceiverId' and 'userSenderId' are required`,
        400,
      );
    }

    const messageConstraints =
      typeof message === 'string' && message.length > 5 && message.length < 255;

    if (!messageConstraints) {
      throw new AppError('Message must be between 5 and 255 characters', 400);
    }

    const tagExists = await this._tagRepository.findById(tagId);

    if (!tagExists) throw new AppError('Tag not found', 404);

    const [userReceiverExists, userSenderExists] = await Promise.all([
      this._userRepository.findById(userReceiverId),
      this._userRepository.findById(userSenderId),
    ]);

    if (!userReceiverExists) {
      throw new AppError('User receiver not found', 404);
    } else if (!userSenderExists) {
      throw new AppError('User sender not found', 404);
    }

    if (userReceiverId === userSenderId) {
      throw new AppError('Try another user', 400);
    }

    const date = new Date();

    const compliment = await this._complimentRepository.create({
      message,
      tagId,
      userReceiverId,
      userSenderId,
      createdAt: date,
      updatedAt: date,
    });

    return compliment;
  }
}
