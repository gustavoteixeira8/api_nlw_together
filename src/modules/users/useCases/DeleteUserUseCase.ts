import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { UserRepositoryProtocol } from '../domain/repositories/UserRepositoryProtocol';
import { UserIdRequest } from '../domain/useCases/UserIdRequest';

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ userId }: UserIdRequest): Promise<void> {
    if (!userId) throw new AppError('User id is required', 400);

    const userExists = await this._userRepository.findById(userId);

    if (!userExists) throw new AppError('User not found', 404);

    await this._userRepository.delete(userId);
  }
}
