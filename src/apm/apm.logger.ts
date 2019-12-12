import { Logger } from '@nestjs/common';

export class ApmLogger {
  constructor(private readonly logger: Logger) {}

  fatal(message: string) {
    this.logger.error(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  info(message: string) {
    this.logger.log(message);
  }

  trace(message: string) {
    this.logger.warn(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
