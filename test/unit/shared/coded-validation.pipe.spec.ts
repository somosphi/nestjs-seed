import { CodedValidatorPipe } from 'src/shared/coded-validation.pipe';
import {  ValidationError, BadRequestException } from '@nestjs/common';

describe('CodedValidatorPipe', () => {
  describe('#details', () => {
    it('should return BadRequestException with details', () => {
      const codedValidatorPipe = new CodedValidatorPipe();

      const result = codedValidatorPipe.transformException([]);

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.message.details).toEqual([]);
    });
    it('should return BadRequestException without details', () => {
      const codedValidatorPipe = new CodedValidatorPipe();

      const details: ValidationError[] = [
        {
          children: undefined,
          constraints: undefined,
          property: '',
          target: '',
          value: {
            balance: 1000,
          },
        },
      ];
      const result = codedValidatorPipe.transformException(details);

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.message.details).toEqual(details);
    });
  });
});
