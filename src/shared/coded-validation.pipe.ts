import {
  Injectable,
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

@Injectable()
export class CodedValidatorPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: errors => this.transformException(errors),
    });
  }

  transformException(errors: ValidationError[]): BadRequestException {
    return new BadRequestException({
      code: 'VALIDATION_FAILED',
      message: 'Validation failed',
      details: errors,
    });
  }
}
