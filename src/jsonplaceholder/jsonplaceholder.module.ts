import { Module, HttpModule } from '@nestjs/common';
import { JsonplaceholderService } from './jsonplaceholder.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.envConfig.jsonplaceholderTimeout,
        baseURL: configService.envConfig.jsonplaceholderUrl,
      }),
    }),
  ],
  providers: [JsonplaceholderService],
  exports: [JsonplaceholderService],
})
export class JsonplaceholderModule {}
