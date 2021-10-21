import { User } from '@modules/users/domain/entities/User';
import { UserRepositoryProtocol } from '@modules/users/domain/repositories/UserRepositoryProtocol';
import { getRepository } from 'typeorm';
import { User as UserEntity } from '../database/entities/User';

export class UserRepositoryOrm implements UserRepositoryProtocol {
  private readonly _table = getRepository(UserEntity);

  public async create(user: User): Promise<User> {
    const userInstance = this._table.create(user);
    return this._table.save(userInstance);
  }

  public async findByGithubId(githubId: number): Promise<User | undefined> {
    return this._table.findOne({ where: { githubId } });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this._table.findOne({ where: { id } });
  }

  public async delete(id: string): Promise<void> {
    await this._table.delete(id);
  }
}
