import { validateSync } from 'class-validator';
import { FindUserDto } from 'src/user/dto/find-user.dto';

describe('FindUserDto', () => {
  it('should throw err when send invalid data', () => {
    const findUserDto = new FindUserDto({
      id: 'asdsad',
    });
    expect(validateSync(findUserDto)).toHaveLength(1);
  });

  it('should pass without errors when send valid data', () => {
    const findUserDto = new FindUserDto({
      id: '1',
    });
    expect(validateSync(findUserDto)).toHaveLength(0);
  });
});
