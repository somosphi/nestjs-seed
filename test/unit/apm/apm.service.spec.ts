import { ApmService } from 'src/apm/apm.service';
import { TestingModule, Test } from '@nestjs/testing';
import { ConfigModule } from 'src/config/config.module';
import elasticApmNode from 'elastic-apm-node';

describe('ApmService', () => {
  let service: ApmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApmService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<ApmService>(ApmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#onModuleInit', () => {
    it('should not started elasticApmNode when dont exist config', async () => {
      jest.spyOn(elasticApmNode, 'start').mockImplementation(() => undefined);

      service.configService.envConfig.apmServiceName = '';
      service.configService.envConfig.apmServiceUrl = '';

      service.onModuleInit();

      expect(elasticApmNode.start).not.toBeCalled();
    });

    it('should started elasticApmNode when exist config', async () => {
      jest.spyOn(elasticApmNode, 'start').mockImplementation(() => undefined);

      service.configService.envConfig.apmServiceName = 'teste';
      service.configService.envConfig.apmServiceUrl = 'http://localhost:3000';

      service.onModuleInit();

      expect(elasticApmNode.start).toBeCalled();
    });
  });
});
