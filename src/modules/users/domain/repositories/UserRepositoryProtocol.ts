import { User } from '../entities/User';

export interface UserRepositoryProtocol {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByGithubId(githubId: number): Promise<User | undefined>;
  delete(id: string): Promise<void>;
}
