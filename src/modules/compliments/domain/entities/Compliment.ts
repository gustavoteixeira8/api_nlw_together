import { Tag } from '@modules/tags/infra/database/entities/Tag';
import { User } from '@modules/users/infra/database/entities/User';

export interface Compliment {
  id?: string;
  message: string;
  userSenderId: string;
  userSender?: User;
  userReceiverId: string;
  userReceiver?: User;
  tagId: string;
  tag?: Tag;
  createdAt: Date;
  updatedAt: Date;
}
