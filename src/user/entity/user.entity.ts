import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserHistory } from './user-history.entity';
import { PartialFilled } from 'src/shared/partial-filled.model';

@Entity()
export class User extends PartialFilled<User> {
  @PrimaryGeneratedColumn({ type: 'bigint' })
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

  @OneToMany(
    () => UserHistory,
    userHistory => userHistory.user,
  )
  histories: UserHistory[];
}
