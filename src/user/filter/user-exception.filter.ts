import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { InvalidExternalIdException } from '../exception';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';
import { CodedException } from 'src/shared/coded.exception';

@Catch(CodedException)
export class UserExceptionFilter extends HttpExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    switch (exception.constructor) {
      case InvalidExternalIdException:
        return super.catch(
          new BadRequestException({
            code: exception.code,
            message: exception.message,
          }),
          host,
        );
      case HttpException:
        return super.catch(exception, host);
      default:
        return super.catch(new InternalServerErrorException(), host);
    }
  }
}
