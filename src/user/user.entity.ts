import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: string;

  @Column('bigint', { unsigned: true, unique: true })
  externalId: string;

  @Column('text')
  name: string;

  @Column('text')
  username: string;

  @Column('text')
  emailAddress: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
