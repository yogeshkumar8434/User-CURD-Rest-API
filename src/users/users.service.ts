import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const { firstName, lastName, email, phoneNumber } = createUserDto;
    const user: User = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phoneNumber,
      status: UserStatus.ACTIVE,
    };
    this.users.push(user);
    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  updateUserStatus(id: string, status: UserStatus): User {
    const user = this.getUserById(id);
    user.status = status;
    return user;
  }
}
