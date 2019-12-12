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
import { User } from './entity/user.entity';
import { UserExceptionFilter } from './user-exception.filter';
import { FetchUserDto, FindUserDto } from './dto';

@Controller('user')
@UseFilters(new UserExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  list() {
    return this.userService.list();
  }

  @Get('/:id')
  async find(@Param() findUserDto: FindUserDto): Promise<User> {
    const user = await this.userService.findById(findUserDto.id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('/fetch')
  @HttpCode(HttpStatus.NO_CONTENT)
  async fetch(@Body() fetchUserDto: FetchUserDto) {
    await this.userService.fetchById(fetchUserDto.externalId);
  }
}
