import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import elasticApmNode from 'elastic-apm-node';
import { ConfigService } from 'src/config/config.service';
import { ApmLogger } from './apm.logger';

@Injectable()
export class ApmService implements OnModuleInit {
  private readonly logger = new Logger(ApmService.name);

  constructor(readonly configService: ConfigService) {}

  onModuleInit() {
    const { apmServiceName, apmServiceUrl } = this.configService.envConfig;
    if (apmServiceName && apmServiceUrl) {
      elasticApmNode.start({
        serviceName: apmServiceName,
        serverUrl: apmServiceUrl,
        logger: new ApmLogger(this.logger),
      });
      this.logger.log('Registered in APM server');
    }
  }
}
