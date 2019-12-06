import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { EnvConfig } from './models/env-config.model';
import { ValidationError } from 'class-validator';

describe('ConfigService', () => {
  const defaultEnv = {
    JSONPLACEHOLDER_URL: 'http://localhost.com/jsonplaceholder-test',
    JSONPLACEHOLDER_TIMEOUT: '300',
    MYSQL_HOST: 'localhost',
    MYSQL_PORT: '33O6',
    MYSQL_DATABASE: 'seed_nest',
    MYSQL_USERNAME: 'root',
    MYSQL_PASSWORD: '1234fudh23',
  };

  const initService = async (config: any): Promise<ConfigService> => {
    class ConfigServiceTestable extends ConfigService {
      protected readEnv(filepath: string) {
        return config;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigServiceTestable('.env'),
        },
      ],
    }).compile();

    return module.get<ConfigService>(ConfigService);
  };

  it('should be defined', async () => {
    expect(await initService(defaultEnv)).toBeDefined();
  });

  it('should set formatted env in envConfig property', async () => {
    const service = await initService(defaultEnv);

    const result = new EnvConfig();
    result.jsonplaceholderTimeout = parseInt(
      defaultEnv.JSONPLACEHOLDER_TIMEOUT,
      10,
    );
    result.jsonplaceholderUrl = defaultEnv.JSONPLACEHOLDER_URL;
    result.mysqlDatabase = defaultEnv.MYSQL_DATABASE;
    result.mysqlHost = defaultEnv.MYSQL_HOST;
    result.mysqlPort = parseInt(defaultEnv.MYSQL_PORT, 10);
    result.mysqlUsername = defaultEnv.MYSQL_USERNAME;
    result.mysqlPassword = defaultEnv.MYSQL_PASSWORD;

    expect(service.envConfig).toEqual(result);
  });

  it('should throw err on env is invalid', async () => {
    const env = {
      ...defaultEnv,
      JSONPLACEHOLDER_URL: 'opa, estou com erro',
    };

    let capturedErr;
    try {
      await initService(env);
    } catch (err) {
      capturedErr = err;
    }

    expect(capturedErr).toBeInstanceOf(ValidationError);
  });
});
