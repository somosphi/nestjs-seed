import { AutoValidator } from 'src/shared/auto-validator.model';
import {
  IsNumberString,
  ValidationError,
  IsString,
  IsByteLength,
} from 'class-validator';

describe('AutoValidator', () => {
  class TestDto extends AutoValidator<TestDto> {
    @IsNumberString()
    readonly id: string;

    @IsString()
    @IsByteLength(4)
    readonly name: string;
  }

  describe('#constructor', () => {
    it('Should trow error when validade ', () => {
      let error = null;

      try {
        const dto = new TestDto({ id: '2r4', name: 'test' });
        return dto;
      } catch (excpetion) {
        error = excpetion;
      }

      expect(error).toBeInstanceOf(ValidationError);
    });
  });
});
