import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserHistoryMethod } from '../enum';

@Entity()
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
}
