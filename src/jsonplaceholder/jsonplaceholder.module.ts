import { Module, HttpModule } from '@nestjs/common';
import { JsonplaceholderService } from './jsonplaceholder.service';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.envConfig.jsonplaceholderTimeout,
        baseURL: configService.envConfig.jsonplaceholderUrl,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JsonplaceholderService],
})
export class JsonplaceholderModule {}
