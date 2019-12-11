import { Module } from '@nestjs/common';
import { ApmService } from './apm.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [ApmService],
})
export class ApmModule {}
