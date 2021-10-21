import { Tag } from '@modules/tags/infra/database/entities/Tag';
import { User } from '@modules/users/infra/database/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('compliments')
export class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  message: string;

  @Column()
  userSenderId: string;

  @JoinColumn({ name: 'userSenderId' })
  @ManyToOne(() => User)
  userSender: User;

  @Column()
  userReceiverId: string;

  @JoinColumn({ name: 'userReceiverId' })
  @ManyToOne(() => User)
  userReceiver: User;

  @Column()
  tagId: string;

  @JoinColumn({ name: 'tagId' })
  @ManyToOne(() => Tag)
  tag: Tag;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = this.id || uuid();
  }
}
