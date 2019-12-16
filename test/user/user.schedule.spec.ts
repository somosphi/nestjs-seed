import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { UserSchedule } from 'src/user/user.schedule';
import { Logger } from '@nestjs/common';

describe('User Schedule', () => {
  let schedule: UserSchedule;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: new UserService(null, null),
        },
        {
          provide: Logger,
          useValue: new Logger('kk'),
        },
        UserSchedule,
      ],
    }).compile();

    schedule = module.get<UserSchedule>(UserSchedule);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(schedule).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('#runFetch', () => {
    it('should return undefined and call service fetch method', async () => {
      jest.spyOn(service, 'fetch').mockImplementation(async () => []);
      const result = await schedule.runFetch();
      expect(result).toBeUndefined();
    });
  });
});
