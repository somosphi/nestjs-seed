import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import elasticApmNode from 'elastic-apm-node';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class ApmService implements OnModuleInit {
  private readonly logger = new Logger(ApmService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const { apmServiceName, apmServiceUrl } = this.configService.envConfig;
    if (apmServiceName && apmServiceUrl) {
      elasticApmNode.start({
        serviceName: apmServiceName,
        serverUrl: apmServiceUrl,
        logger: {
          fatal: (message) => this.logger.error(message),
          debug: (message) => this.logger.debug(message),
          error: (message) => this.logger.error(message),
          info: (message) => this.logger.log(message),
          trace: (message) => this.logger.warn(message),
          warn: (message) => this.logger.warn(message),
        },
      });
      this.logger.log('Registered in APM server');
    }
  }
}
