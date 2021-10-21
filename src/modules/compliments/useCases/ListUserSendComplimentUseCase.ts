import { UserIdRequest } from '@modules/users/domain/useCases/UserIdRequest';
import { inject, injectable } from 'tsyringe';
import { ComplimentRepositoryProtocol } from '../domain/repositories/ComplimentRepositoryProtocol';
import { Compliment } from '../domain/entities/Compliment';

@injectable()
export class ListUserSendComplimentUseCase {
  constructor(
    @inject('ComplimentRepository')
    private readonly _complimentRepository: ComplimentRepositoryProtocol,
  ) {}

  public async execute({ userId }: UserIdRequest): Promise<Compliment[]> {
    const compliments = await this._complimentRepository.findAllByUserSender(userId);

    return compliments;
  }
}
