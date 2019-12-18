import { UserExceptionFilter } from 'src/user/user-exception.filter';
import { InvalidExternalIdException } from 'src/user/exception';
import {
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';

describe('UserExceptionFilter', () => {
  class UserExceptionFilterTestable extends UserExceptionFilter {
    transformException(exception: any): HttpException {
      return super.transformException(exception);
    }
  }

  const userExceptionFilter = new UserExceptionFilterTestable();

  describe('#transformException', () => {
    it('should transform InvalidExternalIdException to BadRequestException', () => {
      const invalidExternalIdException = new InvalidExternalIdException();
      const result = userExceptionFilter.transformException(
        invalidExternalIdException,
      );
      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.message).toEqual({
        code: invalidExternalIdException.code,
        message: invalidExternalIdException.message,
      });
    });

    it('should transform Error to InternalServiceErrorException', () => {
      const error = new Error('quebrou');
      const result = userExceptionFilter.transformException(error);
      expect(result).toBeInstanceOf(InternalServerErrorException);
    });

    it('should return error when receive HttpException', () => {
      const httpException = new HttpException({ message: 'Not found' }, 404);
      const result = userExceptionFilter.transformException(httpException);
      expect(result).toBe(httpException);
    });
  });
});
