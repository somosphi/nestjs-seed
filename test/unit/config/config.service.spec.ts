import { Test, TestingModule } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnv } from 'src/config/config-env.model';

describe('ConfigService', () => {
  const defaultEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...defaultEnv };
  });

  const initService = async (config: any = {}): Promise<ConfigService> => {
    process.env = {
      ...defaultEnv,
      ...config,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();
    return module.get<ConfigService>(ConfigService);
  };

  it('should be defined', async () => {
    expect(await initService(defaultEnv)).toBeDefined();
  });

  it('should set formatted env in envConfig property', async () => {
    const service = await initService(defaultEnv);
    const result = new ConfigEnv();
    result.httpPort = parseInt(defaultEnv.HTTP_PORT, 10);
    result.nodeEnv = defaultEnv.NODE_ENV;
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
    result.apmServiceName = defaultEnv.APM_SERVICE_NAME;
    result.apmServiceUrl = defaultEnv.APM_SERVICE_URL;
    expect(service.envConfig).toEqual(result);
    expect(result.isProduction).toBeFalsy();
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
