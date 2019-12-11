import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CodedValidatorPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: errors =>
        new BadRequestException({
          code: 'VALIDATION_FAILED',
          message: 'Validation failed',
          details: errors,
        }),
    });
  }
}
