import { Compliment } from '@modules/compliments/domain/entities/Compliment';
import { ComplimentRepositoryProtocol } from '@modules/compliments/domain/repositories/ComplimentRepositoryProtocol';
import { getRepository } from 'typeorm';
import { Compliment as ComplimentEntity } from '../database/entities/Compliment';

export class ComplimentRepositoryOrm implements ComplimentRepositoryProtocol {
  private readonly _table = getRepository(ComplimentEntity);

  public async create(compliment: Compliment): Promise<Compliment> {
    const complimentInstance = this._table.create(compliment);
    return this._table.save(complimentInstance);
  }

  public async delete(complimentId: string): Promise<void> {
    await this._table.delete(complimentId);
  }

  public async findAll(): Promise<Compliment[]> {
    return this._table.find({ relations: ['userSender', 'userReceiver', 'tag'] });
  }

  public async findById(complimentId: string): Promise<Compliment | undefined> {
    return this._table.findOne({ where: { id: complimentId } });
  }

  public async findAllByUserReceiver(userReceiverId: string): Promise<Compliment[]> {
    return this._table.find({
      where: { userReceiverId },
      relations: ['userSender', 'userReceiver', 'tag'],
    });
  }

  public async findAllByUserSender(userSenderId: string): Promise<Compliment[]> {
    return this._table.find({
      where: { userSenderId },
      relations: ['userSender', 'userReceiver', 'tag'],
    });
  }
}
