import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { JsonplaceholderModule } from './jsonplaceholder/jsonplaceholder.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { ApmModule } from './apm/apm.module';
import { UserHistory } from './user/entity/user-history.entity';
import { UserSubscriber } from './user/user.subscriber';

@Module({
  imports: [
    ApmModule,
    JsonplaceholderModule,
    ConfigModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.envConfig.typeormConnection,
        host: configService.envConfig.typeormHost,
        port: configService.envConfig.typeormPort,
        database: configService.envConfig.typeormDatabase,
        username: configService.envConfig.typeormUsername,
        password: configService.envConfig.typeormPassword,
        synchronize: false,
        entities: [User, UserHistory],
        subscribers: [UserSubscriber],
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
