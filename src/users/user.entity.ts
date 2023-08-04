import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus } from './user.model';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  status: UserStatus;
}
