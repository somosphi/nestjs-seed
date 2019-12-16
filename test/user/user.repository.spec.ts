import { TestingModule, Test } from '@nestjs/testing';
import { UserRepository } from 'src/user/user.repository';
import { In } from 'typeorm';
import { User } from 'src/user/entity';

describe('User Repository', () => {
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('#findByExternalIds', () => {
    it('should set external ids in query filter (where)', async () => {
      const users = [
        new User({ id: '125', externalId: '1' }),
      ];
      const externalIds = ['1'];
      jest.spyOn(repository, 'find').mockImplementation(async () => users);
      const result = await repository.findByExternalIds(externalIds);
      expect(result).toBe(users);
      expect(repository.find).toBeCalledWith({
        where: { externalId: In(externalIds) },
      });
    });
  });
});
