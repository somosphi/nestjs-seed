import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Controller('/app')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/config')
  test() {
    return this.configService.envConfig;
  }
}
