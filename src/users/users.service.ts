import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filiter.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // getAllUsers(): User[] {
  //   return this.users;
  // }

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

  // async getUserById(id: number): Promise<User> {
  //   const found = await this.userRepository.findOne(id);
  //   if (!found) {
  //     throw new NotFoundException(`User Not Found.`);
  //   }
  //   return found;
  // }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, phoneNumber } = createUserDto;
    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.status = UserStatus.ACTIVE;

    await this.userRepository.save(user);

    return user;
  }

  deleteUser(id: string): void {
    const found = this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== found.id);
  }

  // updateUserStatus(id: string, status: UserStatus): User {
  //   const user = this.getUserById(id);
  //   user.status = status;
  //   return user;
  // }
}
