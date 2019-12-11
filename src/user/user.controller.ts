import { Controller, Get, Param, UseFilters, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserExceptionFilter } from './user.exception.filter';

@Controller('user')
@UseFilters(new UserExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  user() {
    return this.userService.list();
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
