import { HttpIntegrationService } from 'src/shared/http-integration.service';
import { HttpStatus } from '@nestjs/common';

describe('HttpIntegrationService', () => {
  describe('#isNotFoundError', () => {
    it('Should return false when error dont be error NOT_FOUND ', () => {
      const httpIntegrationService: HttpIntegrationService =
        HttpIntegrationService.prototype;

      const err = {
        config: {},
        isAxiosError: false,
        message: '',
        name: '',
        code: '',
        request: '',
        response: {
          config: {},
          request: '',
          data: '',
          status: HttpStatus.BAD_REQUEST,
          statusText: '400',
          headers: {},
        },
        stack: '',
      };

      const response = httpIntegrationService.isNotFoundError(err);

      expect(response).toBe(false);
    });

    it('Should return true when error dont be error NOT_FOUND ', () => {
      const httpIntegrationService: HttpIntegrationService =
        HttpIntegrationService.prototype;

      const error = {
        config: {},
        isAxiosError: true,
        message: '',
        name: '',
        code: '',
        request: '',
        response: {
          config: {},
          request: '',
          data: '',
          status: HttpStatus.NOT_FOUND,
          statusText: '404',
          headers: {},
        },
        stack: '',
      };

      const response = httpIntegrationService.isNotFoundError(error);

      expect(response).toBe(true);
    });
  });
});
