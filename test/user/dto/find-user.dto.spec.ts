
import { ValidationError } from 'class-validator';
import { FindUserDto } from '../../../src/user/dto/find-user.dto';

describe('FindUserDto', () => {

  it('should throw err when send invalid data', () => {
    let capturedErr: ValidationError;
    try {
      const findUserDto = new FindUserDto({
        id: 'asdsad',
      });
    } catch (err) {
      capturedErr = err;
    }
    expect(capturedErr).toBeInstanceOf(ValidationError);
  });

  it('should pass without errors when send valid data', () => {
    let capturedErr: Error;
    try {
      const findUserDto = new FindUserDto({
        id: '1',
      });
    } catch (err) {
      capturedErr = err;
    }
    expect(capturedErr).toBeUndefined();
  });
});
