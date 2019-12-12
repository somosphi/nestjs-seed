import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JsonplaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';
import { ScheduleModule } from 'nest-schedule';
import { UserSchedule } from './user.schedule';
import { UserController } from './user.controller';

@Module({
  imports: [
    JsonplaceholderModule,
    ScheduleModule.register(),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserSchedule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
