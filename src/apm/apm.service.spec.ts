import { Test, TestingModule } from '@nestjs/testing';
import { ApmService } from './apm.service';

describe('ApmService', () => {
  let service: ApmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApmService],
    }).compile();

    service = module.get<ApmService>(ApmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
