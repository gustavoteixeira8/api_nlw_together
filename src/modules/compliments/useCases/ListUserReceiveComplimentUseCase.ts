import { UserIdRequest } from '@modules/users/domain/useCases/UserIdRequest';
import { inject, injectable } from 'tsyringe';
import { Compliment } from '../domain/entities/Compliment';
import { ComplimentRepositoryProtocol } from '../domain/repositories/ComplimentRepositoryProtocol';

@injectable()
export class ListUserReceiveComplimentUseCase {
  constructor(
    @inject('ComplimentRepository')
    private readonly _complimentRepository: ComplimentRepositoryProtocol,
  ) {}

  public async execute({ userId }: UserIdRequest): Promise<Compliment[]> {
    const compliments = await this._complimentRepository.findAllByUserReceiver(userId);

    return compliments;
  }
}
