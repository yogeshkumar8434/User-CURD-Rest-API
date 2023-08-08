import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get()
  // getUsers(@Query(ValidationPipe) filterDto: GetUserFilterDto): User[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.usersService.getUserWithFilters(filterDto);
  //   } else {
  //     return this.usersService.getAllUsers();
  //   }
  // }

  // @Get('/:id')
  // getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return this.usersService.getUserById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  // @Delete('/:id')
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.deleteUser(id);
  // }

  // @Patch('/:id/status')
  // updateUserStatus(
  //   @Param('id') id: string,
  //   @Body('status', UserStatusValidationPipe) status: UserStatus,
  // ): User {
  //   return this.usersService.updateUserStatus(id, status);
  // }
}
