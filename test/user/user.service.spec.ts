import momentTimezone from 'moment-timezone';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entity/user.entity';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';
import { JsonplaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';
import { HttpService } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  let jsonplaceholderService: JsonplaceholderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JsonplaceholderModule],
      providers: [
        UserService,
        UserRepository,
        {
          provide: JsonplaceholderService,
          useValue: new JsonplaceholderService(null),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
    jsonplaceholderService = module.get<JsonplaceholderService>(JsonplaceholderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(jsonplaceholderService).toBeDefined();
  });
});
