import { Tag } from '@modules/tags/domain/entities/Tag';

export interface TagRepositoryProtocol {
  findAll(): Promise<Tag[]>;
  findByName(name: string): Promise<Tag | undefined>;
  findById(id: string): Promise<Tag | undefined>;
  create(tag: Tag): Promise<Tag>;
  delete(tagId: string): Promise<void>;
}
