import { ValidationError, validateSync } from 'class-validator';
import { FetchUserDto } from 'src/user/dto';

describe('FetchUserDto', () => {
  it('should throw err when send invalid data', () => {
    const fetchUserDto = new FetchUserDto({
      externalId: 'asdsad',
    });
    expect(validateSync(fetchUserDto)).toHaveLength(1);
  });

  it('should pass without errors when send valid data', () => {
    const fetchUserDto = new FetchUserDto({
      externalId: '1',
    });
    expect(validateSync(fetchUserDto)).toHaveLength(0);
  });
});
