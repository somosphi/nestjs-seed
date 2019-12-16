import momentTimezone from 'moment-timezone';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entity/user.entity';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';
import { JsonplaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';
import { HttpService } from '@nestjs/common';
import { JsonplaceholderUser } from 'src/jsonplaceholder/jsonplaceholder-user.model';
import { json } from 'body-parser';
import { InvalidExternalIdException } from 'src/user/exception';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  const jsonplaceholderService = new JsonplaceholderService(null);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JsonplaceholderModule],
      providers: [
        UserService,
        UserRepository,
        {
          provide: JsonplaceholderService,
          useValue: jsonplaceholderService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(jsonplaceholderService).toBeDefined();
  });

  describe('#fetch', () => {
    it('should sync users with external users returned from api', async () => {
      const externalUsers = [
        new JsonplaceholderUser({
          id: 1,
          email: 'fulano@gmail.com',
          name: 'fulano',
          username: 'fulano_1',
        }),
        new JsonplaceholderUser({
          id: 2,
          email: 'fulano_de_tal@gmail.com',
          name: 'fulano_de_tal',
          username: 'fulano_2',
        }),
      ];

      const users: Array<Partial<User>> = [
        {
          externalId: externalUsers[0].id.toString(),
          username: externalUsers[0].username,
          name: externalUsers[0].name,
          emailAddress: externalUsers[0].email,
        },
        {
          externalId: externalUsers[1].id.toString(),
          username: externalUsers[1].username,
          name: externalUsers[1].name,
          emailAddress: externalUsers[1].email,
        },
      ];

      const ids = ['1', '2'];

      jest
        .spyOn(jsonplaceholderService, 'findUsers')
        .mockImplementation(async () => externalUsers);

      jest
        .spyOn(repository, 'syncByExternalIds')
        .mockImplementation(async () => ids);

      const result = await service.fetch();

      expect(result).toBe(ids);
      expect(jsonplaceholderService.findUsers).toBeCalled();
      expect(repository.syncByExternalIds).toBeCalledWith(users);
    });
  });

  describe('#findById', () => {
    it('should return repository findOne result', async () => {
      const user = new User();
      user.id = '1';
      jest.spyOn(repository, 'findOne').mockImplementation(async () => user);
      const result = await service.findById(user.id);
      expect(result).toBe(user);
      expect(repository.findOne).toBeCalled();
    });
  });

  describe('#list', () => {
    it('should return repository find result', async () => {
      const user = new User();
      user.id = '1';
      const users = [user];
      jest.spyOn(repository, 'find').mockImplementation(async () => users);
      const result = await service.list();
      expect(result).toBe(users);
      expect(repository.find).toBeCalledWith();
    });
  });

  describe('#fetchByExternalId', () => {
    it('should throw InvalidExternalIdException when not found jsonplaceholder user', async () => {
      const externalUser = new JsonplaceholderUser({
        id: 1,
        email: 'fulano@gmail.com',
        name: 'fulano',
        username: 'fulano_1',
      });

      jest
        .spyOn(jsonplaceholderService, 'findUser')
        .mockImplementation(async () => null);

      let capturedErr: InvalidExternalIdException;
      try {
        await service.fetchByExternalId(externalUser.id.toString());
      } catch (err) {
        capturedErr = err;
      }

      expect(capturedErr).toBeInstanceOf(InvalidExternalIdException);
    });

    it('should call syncByExternalIds with user from jsonplaceholder', async () => {
      const externalUser = new JsonplaceholderUser({
        id: 1,
        email: 'fulano@gmail.com',
        name: 'fulano',
        username: 'fulano_1',
      });

      const user: Partial<User> = {
        externalId: externalUser.id.toString(),
        username: externalUser.username,
        name: externalUser.name,
        emailAddress: externalUser.email,
      };

      const id = '1';
      jest
        .spyOn(jsonplaceholderService, 'findUser')
        .mockImplementation(async () => externalUser);

      jest
        .spyOn(repository, 'syncByExternalIds')
        .mockImplementation(async () => [id]);

      const result = await service.fetchByExternalId(
        externalUser.id.toString(),
      );

      expect(result).toBe(id);
      expect(jsonplaceholderService.findUser).toBeCalled();
      expect(repository.syncByExternalIds).toBeCalledWith([user]);
    });
  });
});
