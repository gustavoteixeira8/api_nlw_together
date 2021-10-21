import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  githubId: number;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    this.id = this.id || uuid();
  }
}
