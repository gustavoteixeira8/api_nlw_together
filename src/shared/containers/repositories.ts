import { container } from 'tsyringe';
import { UserRepositoryProtocol } from '@modules/users/domain/repositories/UserRepositoryProtocol';
import { UserRepositoryOrm } from '@modules/users/infra/repositories/UserRepositoryOrm';
import { TagRepositoryProtocol } from '@modules/tags/domain/repositories/TagRepositoryProtocol';
import { TagRepositoryOrm } from '@modules/tags/infra/repositories/TagRepositoryOrm';
import { ComplimentRepositoryProtocol } from '@modules/compliments/domain/repositories/ComplimentRepositoryProtocol';
import { ComplimentRepositoryOrm } from '@modules/compliments/infra/repositories/ComplimentRepositoryOrm';

container.registerSingleton<UserRepositoryProtocol>('UserRepository', UserRepositoryOrm);
container.registerSingleton<TagRepositoryProtocol>('TagRepository', TagRepositoryOrm);
container.registerSingleton<ComplimentRepositoryProtocol>(
  'ComplimentRepository',
  ComplimentRepositoryOrm,
);
