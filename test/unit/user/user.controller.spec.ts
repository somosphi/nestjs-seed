import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { FetchUserDto, FindUserDto } from 'src/user/dto';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entity';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: new UserService(null, null),
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('#list', () => {
    it('should return service list result', async () => {
      const users = [new User()];
      jest.spyOn(service, 'list').mockImplementation(async () => users);
      const result = await service.list();
      expect(result).toBe(users);
    });

    it('should return empty array on service return empty array', async () => {
      const users = [];
      jest.spyOn(service, 'list').mockImplementation(async () => users);
      const result = await service.list();
      expect(result).toBe(users);
    });
  });

  describe('#find', () => {
    it('should throw NotFoundException when not found user', async () => {
      jest.spyOn(service, 'findById').mockImplementation(() => null);
      let capturedErr: Error;
      try {
        await controller.find(new FindUserDto({ id: '1' }));
      } catch (err) {
        capturedErr = err;
      }
      expect(capturedErr).toBeInstanceOf(NotFoundException);
    });

    it('should return user when found user', async () => {
      const user = new User();
      user.id = '1';
      jest.spyOn(service, 'findById').mockImplementation(async () => user);
      const result = await controller.find(new FindUserDto({ id: '1' }));
      expect(result).toBe(user);
    });
  });

  describe('#fetch', () => {
    it('should return undefined and call user service fetchByExternalId', async () => {
      const dto = new FetchUserDto({ externalId: '1' });
      jest
        .spyOn(service, 'fetchByExternalId')
        .mockImplementation(async () => '1');
      const result = await controller.fetch(dto);
      expect(service.fetchByExternalId).toBeCalledWith(dto.externalId);
      expect(result).toBeUndefined();
    });
  });
});
