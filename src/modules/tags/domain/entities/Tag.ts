import { User } from '@modules/users/domain/entities/User';

export interface Tag {
  readonly id?: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}
