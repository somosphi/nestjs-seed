import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('external_id')
  externalId: number;

  @Column('name')
  name: string;

  @Column('username')
  username: string;

  @Column('email_address')
  emailAddress: string;

  @Column('created_at')
  createdAt: Date;

  @Column('updated_at')
  updatedAt: Date;
}
