import {
  Controller,
  Get,
  Param,
  UseFilters,
  NotFoundException,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserExceptionFilter } from './user-exception.filter';
import { FetchUserDto } from './dto';
import { FindUserDto } from './dto/find-user.dto';

@Controller('user')
@UseFilters(new UserExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  user() {
    return this.userService.list();
  }

  @Get('/:id')
  async findOne(@Param() findUserDto: FindUserDto): Promise<User> {
    const user = await this.userService.findById(findUserDto.id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('/fetch')
  @HttpCode(HttpStatus.NO_CONTENT)
  async fetch(@Body() fetchDto: FetchUserDto) {
    await this.userService.fetchUser(fetchDto.externalId);
  }
}
