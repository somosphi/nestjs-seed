import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { JsonplaceholderModule } from './jsonplaceholder/jsonplaceholder.module';

@Module({
  imports: [JsonplaceholderModule, ConfigModule],
})
export class AppModule {}
