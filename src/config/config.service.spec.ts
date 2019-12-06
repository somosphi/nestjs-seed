import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { EnvConfig } from './models/env-config.model';

describe('ConfigService', () => {
  const initService = async (config: any): Promise<ConfigService> => {
    jest.mock('fs', () => ({
      readFileSync: '',
    }));

    jest.mock('dotenv', () => ({
      parse: () => config,
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService('.env'),
        },
      ],
    }).compile();

    return module.get<ConfigService>(ConfigService);
  };

  it('should be defined', async () => {
    const env = {
      JSONPLACEHOLDER_URL: 'http://localhost.com/jsonplaceholder-test',
      JSONPLACEHOLDER_TIMEOUT: '300',
    };
    expect(await initService(env)).toBeDefined();
  });

  it('should set formatted env in envConfig property', async () => {
    const env = {
      JSONPLACEHOLDER_URL: 'http://localhost.com/jsonplaceholder-test',
      JSONPLACEHOLDER_TIMEOUT: '300',
    };

    const service = await initService(env);

    const result = new EnvConfig();
    result.jsonplaceholderTimeout = parseInt(env.JSONPLACEHOLDER_TIMEOUT, 10);
    result.jsonplaceholderUrl = env.JSONPLACEHOLDER_URL;
    expect(service.envConfig).toEqual(result);
  });
});
