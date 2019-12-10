import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  user() {
    return this.userService.list();
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<User> {
    return await this.userService.findById(id);
  }
}
