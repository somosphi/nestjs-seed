import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { validateSync } from 'class-validator';
import { ConfigEnv } from './config-env.model';

@Injectable()
export class ConfigService {
  readonly envConfig: ConfigEnv;

  constructor(filePath: string) {
    this.envConfig = this.validateInput(this.readEnv(filePath));
  }

  protected readEnv(filePath: string): any {
    return dotenv.parse(fs.readFileSync(filePath));
  }

  protected initEnvConfig(config: any): ConfigEnv {
    const envConfig = new ConfigEnv();
    envConfig.jsonplaceholderUrl = config.JSONPLACEHOLDER_URL;
    envConfig.jsonplaceholderTimeout = parseInt(
      config.JSONPLACEHOLDER_TIMEOUT,
      10,
    );
    envConfig.mysqlHost = config.MYSQL_HOST;
    envConfig.mysqlPort = parseInt(config.MYSQL_PORT, 10);
    envConfig.mysqlDatabase = config.MYSQL_DATABASE;
    envConfig.mysqlUsername = config.MYSQL_USERNAME;
    envConfig.mysqlPassword = config.MYSQL_PASSWORD;
    if (config.APM_SERVICE_NAME) {
      envConfig.apmServiceName = config.APM_SERVICE_NAME;
    }
    if (config.APM_SERVICE_URL) {
      envConfig.apmServiceUrl = config.APM_SERVICE_URL;
    }
    return envConfig;
  }

  private validateInput(config: any): ConfigEnv {
    const envConfig = this.initEnvConfig(config);
    const errors = validateSync(envConfig);
    if (errors.length) {
      throw errors.pop();
    }
    return envConfig;
  }
}
