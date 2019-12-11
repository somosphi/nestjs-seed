import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { JsonplaceholderService } from './jsonplaceholder/jsonplaceholder.service';

@Controller('/app')
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly json: JsonplaceholderService,
  ) {}

  @Get('/config')
  test() {
    return this.configService.envConfig;
  }

  @Get('/fetch')
  fetch() {
    return this.json.findUsers();
  }
}
