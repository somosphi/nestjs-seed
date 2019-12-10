import momentTimezone from 'moment-timezone';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    // tslint:disable-next-line:no-console
    console.log('kk');
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findById', () => {
    it('should return user repository result when exists record', async () => {
      const user: User = {
        id: '1',
        externalId: '2',
        name: 'Fualno de Tal',
        username: 'fulano_de_tal',
        emailAddress: 'fulano@gmail.com',
        createdAt: momentTimezone.utc().toDate(),
        updatedAt: momentTimezone.utc().toDate(),
      };

      jest
        .spyOn(repository, 'findOneOrFail')
        .mockImplementation(async () => user);

      const result = await service.findByIdOrFail(user.id);

      expect(result).toBe(user);
      expect(repository.findOneOrFail).toBeCalledWith(user.id);
    });

    it('should throw user repository error when empty record', async () => {
      const userId = 1;
      const err = new Error('OPS');

      jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(err);

      let capturedErr: Error;
      try {
        await service.findByIdOrFail(userId);
      } catch (err) {
        capturedErr = err;
      }

      expect(capturedErr).toBe(err);
      expect(repository.findOneOrFail).toBeCalledWith(userId);
    });
  });

  describe('#list', () => {
    it('should return user repository result', async () => {
      const mockData: User[] = [
        {
          id: '1',
          externalId: '2',
          name: 'Fualno de Tal',
          username: 'fulano_de_tal',
          emailAddress: 'fulano@gmail.com',
          createdAt: momentTimezone.utc().toDate(),
          updatedAt: momentTimezone.utc().toDate(),
        },
      ];

      jest.spyOn(repository, 'find').mockImplementation(async () => mockData);

      const result = await service.list();

      expect(result).toBe(mockData);
      expect(repository.find).toBeCalled();
    });
  });
});
