import { FetchUserDto } from 'src/user/dto';
import { ValidationError } from 'class-validator';

describe('FetchUserDto', () => {

  it('should throw err when send invalid data', () => {
    let capturedErr: Error;
    try {
      new FetchUserDto({
        // @ts-ignore
        externalId: 1,
      });
    } catch (err) {
      capturedErr = err;
    }
    expect(capturedErr).toBeInstanceOf(ValidationError);
  })
});
