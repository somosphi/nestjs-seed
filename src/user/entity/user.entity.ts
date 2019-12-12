import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserHistory } from './user-history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  externalId: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  emailAddress: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => UserHistory, userHistory => userHistory.user)
  histories: UserHistory[];
}
