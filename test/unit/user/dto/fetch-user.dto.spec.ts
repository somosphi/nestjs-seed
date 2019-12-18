
import { ValidationError } from 'class-validator';
import { FetchUserDto } from 'src/user/dto';

describe('FetchUserDto', () => {

  it('should throw err when send invalid data', () => {
    let capturedErr: ValidationError;
    try {
      const fetchUserDto = new FetchUserDto({
        externalId: 'asdsad',
      });
    } catch (err) {
      capturedErr = err;
    }
    expect(capturedErr).toBeInstanceOf(ValidationError);
  });

  it('should pass without errors when send valid data', () => {
    let capturedErr: Error;
    try {
      const fetchUserDto = new FetchUserDto({
        externalId: '1',
      });
    } catch (err) {
      capturedErr = err;
    }
    expect(capturedErr).toBeUndefined();
  });
});
