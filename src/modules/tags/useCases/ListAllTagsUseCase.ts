import { inject, injectable } from 'tsyringe';
import { Tag } from '../domain/entities/Tag';
import { TagRepositoryProtocol } from '../domain/repositories/TagRepositoryProtocol';

@injectable()
export class ListAllTagsUseCase {
  constructor(
    @inject('TagRepository')
    private readonly _tagRepository: TagRepositoryProtocol,
  ) {}

  public async execute(): Promise<Tag[]> {
    const tags = await this._tagRepository.findAll();

    return tags;
  }
}
