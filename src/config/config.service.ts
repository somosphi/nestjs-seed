import { Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvConfig } from './models/env-config.model';

@Injectable()
export class ConfigService {
  readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(config: any): EnvConfig {
    const envConfig = new EnvConfig();
    envConfig.jsonplaceholderUrl = config.JSONPLACEHOLDER_URL;
    envConfig.jsonplaceholderTimeout = parseInt(
      config.JSONPLACEHOLDER_TIMEOUT,
      10,
    );

    const errors = validateSync(envConfig);
    if (errors.length) {
      throw errors.pop();
    }

    return envConfig;
  }
}
