import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserHistoryMethod } from '../user.enum';
import { User } from './user.entity';
import { PartialFilled } from 'src/shared/partial-filled.model';

@Entity('userHistory')
export class UserHistory extends PartialFilled<UserHistory> {
  @PrimaryGeneratedColumn({ type: 'bigint' })
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
