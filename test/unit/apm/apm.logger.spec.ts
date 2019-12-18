import { ApmLogger } from 'src/apm/apm.logger';
import { Logger } from '@nestjs/common';

describe('ApmLogger', () => {
  const msn = 'test';

  const apmlogger = new ApmLogger(new Logger(msn));

  describe('#fatal', () => {
    it('should called logger.error', () => {
      jest.spyOn(Logger, 'error').mockImplementation(() => undefined);

      apmlogger.fatal(msn);

      expect(Logger.error).toBeCalled();
    });
  });

  describe('#debug', () => {
    it('should called logger.debug', () => {
      jest.spyOn(Logger, 'debug').mockImplementation(() => undefined);

      apmlogger.debug(msn);
      expect(Logger.debug).toBeCalled();
    });
  });

  describe('#error', () => {
    it('should called logger.error', () => {
      jest.spyOn(Logger, 'error').mockImplementation(() => undefined);

      apmlogger.error(msn);
      expect(Logger.error).toBeCalled();
    });
  });

  describe('#info', () => {
    it('should called logger.log', () => {
      jest.spyOn(Logger, 'log').mockImplementation(() => undefined);

      apmlogger.info(msn);
      expect(Logger.log).toBeCalled();
    });
  });

  describe('#trace', () => {
    it('should called logger.warn', () => {
      jest.spyOn(Logger, 'warn').mockImplementation(() => undefined);

      apmlogger.trace(msn);
      expect(Logger.warn).toBeCalled();
    });
  });

  describe('#warn', () => {
    it('should called logger.warn', () => {
      jest.spyOn(Logger, 'warn').mockImplementation(() => undefined);

      apmlogger.warn(msn);
      expect(Logger.warn).toBeCalled();
    });
  });
});
