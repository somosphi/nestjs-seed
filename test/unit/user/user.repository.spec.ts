import { TestingModule, Test } from '@nestjs/testing';
import { UserRepository } from 'src/user/user.repository';
import * as typeorm from 'typeorm';
import { User } from 'src/user/entity';
import { mockTransaction } from 'test/helpers';

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
      const users = [new User({ id: '125', externalId: '1' })];
      const externalIds = ['1'];
      jest.spyOn(repository, 'find').mockImplementation(async () => users);
      const result = await repository.findByExternalIds(externalIds);
      expect(result).toBe(users);
      expect(repository.find).toBeCalledWith({
        where: { externalId: typeorm.In(externalIds) },
      });
    });
  });

  describe('#syncByExternalIds', () => {
    it('should update already existing users', async () => {
      const actualUsers = [
        new User({ id: '10', externalId: '1' }),
        new User({ id: '20', externalId: '2' }),
      ];

      const partialUsers: Array<Partial<User>> = [
        {
          externalId: '1',
          emailAddress: 'fulano@gmail.com',
          name: 'fulano',
          username: 'fulano_1',
        },
        {
          externalId: '2',
          emailAddress: 'opa@gmail.com',
          name: 'opa',
          username: 'opa_1',
        },
      ];

      const externalIds = actualUsers.map(user => user.externalId);

      mockTransaction(repository);

      jest
        .spyOn(repository, 'findByExternalIds')
        .mockImplementation(async () => actualUsers);

      jest.spyOn(repository, 'save').mockImplementation(async () => null);

      const result = await repository.syncByExternalIds(partialUsers);

      expect(result).toEqual(actualUsers.map(user => user.id));
      expect(repository.findByExternalIds).toBeCalledWith(externalIds);

      partialUsers.forEach(partialUser => {
        const actualUser = actualUsers.find(
          user => user.externalId === partialUser.externalId,
        );
        expect(repository.save).toBeCalledWith(actualUser);
      });
    });

    it('should insert not existing users', async () => {
      const actualUsers = [];

      const partialUsers: Array<Partial<User>> = [
        {
          externalId: '1',
          emailAddress: 'fulano@gmail.com',
          name: 'fulano',
          username: 'fulano_1',
        },
        {
          externalId: '2',
          emailAddress: 'opa@gmail.com',
          name: 'opa',
          username: 'opa_1',
        },
      ];

      const externalIds = partialUsers.map(user => user.externalId);

      mockTransaction(repository);

      jest
        .spyOn(repository, 'findByExternalIds')
        .mockImplementation(async () => actualUsers);

      const newIds = ['1', '2'];

      jest.spyOn(repository, 'save').mockImplementation(async user => {
        user.id =
          newIds[
            partialUsers.findIndex(
              partialUser => partialUser.externalId === user.externalId,
            )
          ];
        return null;
      });

      const result = await repository.syncByExternalIds(partialUsers);

      expect(result).toEqual(newIds);
      expect(repository.findByExternalIds).toBeCalledWith(externalIds);

      partialUsers.forEach((record, index) => {
        const user = new User();
        user.emailAddress = record.emailAddress;
        user.name = record.name;
        user.username = record.username;
        user.externalId = record.externalId;
        user.id = newIds[index];
        expect(repository.save).toHaveBeenNthCalledWith(index + 1, user);
      });
    });
  });
});
