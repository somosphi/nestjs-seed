import { HttpExceptionFilter } from 'src/shared/http-exception.filter';
import {
  ArgumentsHost,
  HttpException,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('HttpExceptionFilter', () => {
  describe('#catch', () => {
    it('should return status for HttpException', () => {
      const httpExceptionFilter = new HttpExceptionFilter();

      const httpArgumentsHost: HttpArgumentsHost = {
        getNext: () => undefined,
        getRequest: () => undefined,
        getResponse: (): any => {
          return {
            status: status => {
              return {
                json: () => ({ success: false, status }),
              };
            },
          };
        },
      };

      const argument: ArgumentsHost = {
        getArgByIndex: () => undefined,
        getArgs: () => undefined,
        getType: () => undefined,
        switchToHttp: () => httpArgumentsHost,
        switchToRpc: () => undefined,
        switchToWs: () => undefined,
      };

      const result = httpExceptionFilter.catch(
        new HttpException('teste', HttpStatus.NOT_FOUND),
        argument,
      );

      expect(result).toEqual({ success: false, status: HttpStatus.NOT_FOUND });
    });

    it('should return status for BadRequestException', () => {
      const httpExceptionFilter = new HttpExceptionFilter();

      const httpArgumentsHost: HttpArgumentsHost = {
        getNext: () => undefined,
        getRequest: () => undefined,
        getResponse: (): any => {
          return {
            status: status => {
              return {
                json: () => ({ success: false, status }),
              };
            },
          };
        },
      };

      const argument: ArgumentsHost = {
        getArgByIndex: () => undefined,
        getArgs: () => undefined,
        getType: () => undefined,
        switchToHttp: () => httpArgumentsHost,
        switchToRpc: () => undefined,
        switchToWs: () => undefined,
      };

      const result = httpExceptionFilter.catch(
        new BadRequestException('teste'),
        argument,
      );

      expect(result).toEqual({
        success: false,
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('should return status for BadRequestException', () => {
      const httpExceptionFilter = new HttpExceptionFilter();

      const httpArgumentsHost: HttpArgumentsHost = {
        getNext: () => undefined,
        getRequest: () => undefined,
        getResponse: (): any => {
          return {
            status: status => {
              return {
                json: () => ({ success: false, status }),
              };
            },
          };
        },
      };

      const argument: ArgumentsHost = {
        getArgByIndex: () => undefined,
        getArgs: () => undefined,
        getType: () => undefined,
        switchToHttp: () => httpArgumentsHost,
        switchToRpc: () => undefined,
        switchToWs: () => undefined,
      };

      const result = httpExceptionFilter.catch(
        new InternalServerErrorException('teste'),
        argument,
      );

      expect(result).toEqual({
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    });
  });
});
