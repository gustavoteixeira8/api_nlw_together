import { UserRepositoryProtocol } from '@modules/users/domain/repositories/UserRepositoryProtocol';
import { UserIdRequest } from '@modules/users/domain/useCases/UserIdRequest';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ComplimentRepositoryProtocol } from '../domain/repositories/ComplimentRepositoryProtocol';
import { ComplimentIdRequest } from '../domain/useCases/ComplimentIdRequest';

@injectable()
export class DeleteComplimentUseCase {
  constructor(
    @inject('ComplimentRepository')
    private readonly _complimentRepository: ComplimentRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({
    complimentId,
    userId,
  }: ComplimentIdRequest & UserIdRequest): Promise<void> {
    if (!complimentId) throw new AppError('Compliment id is required', 400);

    const compliment = await this._complimentRepository.findById(complimentId);

    if (!compliment) throw new AppError('Compliment not found', 404);

    const userExists = await this._userRepository.findById(userId);

    if (
      compliment.userSenderId !== null &&
      userExists &&
      userExists.id !== compliment.userSenderId
    ) {
      throw new AppError('You cannot delete this compliment', 400);
    }

    await this._complimentRepository.delete(complimentId);
  }
}
