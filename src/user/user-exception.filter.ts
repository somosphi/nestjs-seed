import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { InvalidExternalIdException } from './exception';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';

@Catch(Error)
export class UserExceptionFilter extends HttpExceptionFilter {
  protected transformException(exception: any): HttpException {
    switch (exception.constructor) {
      case InvalidExternalIdException:
        return new BadRequestException({
          code: exception.code,
          message: exception.message,
        });
      case HttpException:
        return exception;
      default:
        return new InternalServerErrorException();
    }
  }

  catch(exception: any, host: ArgumentsHost) {
    super.catch(this.transformException(exception), host);
  }
}
