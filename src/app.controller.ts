import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly connection: Connection,
  ) {}

  @Get('/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async status() {
    await this.connection.query('SELECT 1');
  }
}
