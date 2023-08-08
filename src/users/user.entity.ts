import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';
import { UserStatus } from './user-status.enum';

@Index('user_id_pkey', ['id'], { unique: true })
@Entity('usermanagment')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'first_name', nullable: false })
  firstName: string | null;

  @Column('varchar', { name: 'last_name', nullable: false })
  lastName: string | null;

  @Column('varchar', { name: 'email', nullable: false })
  email: string | null;

  @Column('varchar', { name: 'phone_number', nullable: false })
  phoneNumber: string | null;

  @Column('varchar', { name: 'status', nullable: false })
  status: UserStatus;
}
