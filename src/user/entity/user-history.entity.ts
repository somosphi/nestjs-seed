import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserHistoryMethod } from '../user.enum';
import { User } from './user.entity';

@Entity('userHistory')
export class UserHistory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  field: string;

  @Column()
  value: string;

  @Column()
  method: UserHistoryMethod;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, user => user.histories)
  user: User;
}
