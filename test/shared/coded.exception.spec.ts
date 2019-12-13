import { CodedException } from 'src/shared/coded.exception';

describe('CodedException', () => {
  describe('#toJSON', () => {
    it('Should return object with code and message', () => {
      const code = 'TESTE';
      const message = 'Test of error ';

      const codeException = new CodedException(code, message);

      expect(codeException.toJSON()).toEqual({
        code,
        message,
      });
    });
  });
});
