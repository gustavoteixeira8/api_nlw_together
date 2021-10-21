import { Compliment } from '../entities/Compliment';

export interface ComplimentRepositoryProtocol {
  create(compliment: Compliment): Promise<Compliment>;
  delete(complimentId: string): Promise<void>;
  findAll(): Promise<Compliment[]>;
  findById(complimentId: string): Promise<Compliment | undefined>;
  findAllByUserReceiver(userReceiverId: string): Promise<Compliment[]>;
  findAllByUserSender(userSenderId: string): Promise<Compliment[]>;
}
