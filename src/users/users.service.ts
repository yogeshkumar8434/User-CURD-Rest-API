import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filiter.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserWithFilters(filterDto: GetUserFilterDto): User[] {
    const { status, search } = filterDto;
    let users = this.getAllUsers();
    if (status) {
      users = users.filter((user) => user.status === status);
    }
    if (search) {
      users = users.filter(
        (user) =>
          user.firstName.includes(search) || user.lastName.includes(search),
      );
    }
    return users;
  }

  getUserById(id: string): User {
    const found = this.users.find((user) => user.id === id);
    if (!found) {
      throw new NotFoundException(`User Not Found.`);
    }
    return found;
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
    const found = this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== found.id);
  }

  updateUserStatus(id: string, status: UserStatus): User {
    const user = this.getUserById(id);
    user.status = status;
    return user;
  }
}
