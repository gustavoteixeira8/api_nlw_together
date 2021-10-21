import { User } from '../entities/User';

export interface AuthUserResponse {
  token: string;
  user: User;
}
