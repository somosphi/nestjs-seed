import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { JsonplaceholderModule } from './jsonplaceholder/jsonplaceholder.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ApmModule } from './apm/apm.module';

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
        type: 'mysql',
        host: configService.envConfig.mysqlHost,
        port: configService.envConfig.mysqlPort,
        database: configService.envConfig.mysqlDatabase,
        username: configService.envConfig.mysqlUsername,
        password: configService.envConfig.mysqlPassword,
        synchronize: true,
        entities: [User],
      }),
    }),
    ApmModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
