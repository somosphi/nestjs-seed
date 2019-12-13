import { Test, TestingModule } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import { ConfigService } from '../../src/config/config.service';
import { ConfigEnv } from '../../src/config/config-env.model';

describe('ConfigService', () => {
  const defaultEnv = {
    JSONPLACEHOLDER_URL: 'http://localhost.com/jsonplaceholder-test',
    JSONPLACEHOLDER_TIMEOUT: '300',
    TYPEORM_CONNECTION: 'mysql',
    TYPEORM_HOST: 'localhost',
    TYPEORM_PORT: '33O6',
    TYPEORM_DATABASE: 'seed_nest',
    TYPEORM_USERNAME: 'root',
    TYPEORM_PASSWORD: '',
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

    const result = new ConfigEnv();
    result.jsonplaceholderTimeout = parseInt(
      defaultEnv.JSONPLACEHOLDER_TIMEOUT,
      10,
    );
    result.typeormConnection = defaultEnv.TYPEORM_CONNECTION as 'mysql';
    result.jsonplaceholderUrl = defaultEnv.JSONPLACEHOLDER_URL;
    result.typeormDatabase = defaultEnv.TYPEORM_DATABASE;
    result.typeormHost = defaultEnv.TYPEORM_HOST;
    result.typeormPort = parseInt(defaultEnv.TYPEORM_PORT, 10);
    result.typeormUsername = defaultEnv.TYPEORM_USERNAME;
    result.typeormPassword = defaultEnv.TYPEORM_PASSWORD;
    
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
