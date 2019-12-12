import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

export abstract class HttpIntegrationService {

  private isStatusCodeError(err: AxiosError, statusCode: number) {
    try {
      return err.response.status === statusCode;
    } catch (err) {
      return false;
    }
  }

  isNotFoundError(err: AxiosError): boolean {
    return this.isStatusCodeError(err, HttpStatus.NOT_FOUND);
  }
}
