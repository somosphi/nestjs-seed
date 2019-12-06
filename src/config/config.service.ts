import { Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvConfig } from './models/env-config.model';

@Injectable()
export class ConfigService {
  readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    this.envConfig = this.validateInput(this.readEnv(filePath));
  }

  protected readEnv(filePath: string): any {
    return dotenv.parse(fs.readFileSync(filePath));
  }

  protected initEnvConfig(config: any): EnvConfig {
    const envConfig = new EnvConfig();
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
    return envConfig;
  }

  private validateInput(config: any): EnvConfig {
    const envConfig = this.initEnvConfig(config);
    const errors = validateSync(envConfig);

    if (errors.length) {
      throw errors.pop();
    }

    return envConfig;
  }
}
