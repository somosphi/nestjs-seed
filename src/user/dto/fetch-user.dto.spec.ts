
import { ValidationError } from 'class-validator';
import { FetchUserDto } from './fetch-user.dto';

describe('FetchUserDto', () => {

  it('should throw err when send invalid data', () => {
    let capturedErr: ValidationError;
    try {
      new FetchUserDto({
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
      new FetchUserDto({
        externalId: '1',
      });
    } catch (err) {
      capturedErr = err;
    }
    expect(capturedErr).toBeUndefined();
  });
});
