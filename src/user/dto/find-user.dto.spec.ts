
import { ValidationError } from 'class-validator';
import { FindUserDto } from './find-user.dto';

describe('FindUserDto', () => {

  it('should throw err when send invalid data', () => {
    let capturedErr: ValidationError;
    try {
      new FindUserDto({
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
      new FindUserDto({
        id: '1',
      });
    } catch (err) {
      capturedErr = err;
    }
    expect(capturedErr).toBeUndefined();
  });
});
