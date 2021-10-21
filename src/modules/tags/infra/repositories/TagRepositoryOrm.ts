import { TagRepositoryProtocol } from '@modules/tags/domain/repositories/TagRepositoryProtocol';
import { Tag } from '@modules/tags/domain/entities/Tag';
import { Tag as TagEntity } from '../database/entities/Tag';
import { getRepository } from 'typeorm';

export class TagRepositoryOrm implements TagRepositoryProtocol {
  private readonly _table = getRepository(TagEntity);

  public async findAll(): Promise<Tag[]> {
    return this._table.find({ relations: ['user'] });
  }

  public async findByName(name: string): Promise<Tag | undefined> {
    return this._table.findOne({ where: { name } });
  }

  public async findById(id: string): Promise<Tag | undefined> {
    return this._table.findOne({ where: { id } });
  }

  public async create(tag: Tag): Promise<Tag> {
    const tagInstance = this._table.create(tag);

    return this._table.save(tagInstance);
  }

  public async delete(tagId: string): Promise<void> {
    await this._table.delete(tagId);
  }
}
