import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { JsonplaceholderService } from './jsonplaceholder/jsonplaceholder.service';
import { UserService } from './user/user.service';

@Controller('/app')
export class AppController {

  constructor(
    private readonly configService: ConfigService,
    private readonly jsonplaceholderService: JsonplaceholderService,
    private readonly userService: UserService,
  ) {}

  @Get('/config')
  test() {
    return this.configService.envConfig;
  }

  @Get('/jph')
  jph() {
    return this.jsonplaceholderService.findUsers();
  }

  @Get('/user')
  user() {
    return this.userService.list();
  }

  @Get('/user/fetch')
  fetchUser() {
    return this.userService.fetch();
  }
}
