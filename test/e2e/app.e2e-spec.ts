import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserHistory } from 'src/user/entity';
import { UserSubscriber } from 'src/user/user.subscriber';
import { CreateTableUser1576160977698 } from 'migration/1576160977698-create-table-user';
import { CreateTableUserHistory1576171192660 } from 'migration/1576171192660-create-table-user-history';
import { TestInsertUser1576872526662 } from 'migration/test/1576872526662-test_insert_user';
import { JsonplaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from 'src/config/config.service';
import { TestDeleteUser1576872526662 } from 'migration/test/1576872526662-test_delete_user copy';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        JsonplaceholderModule,
        ConfigModule,
        UserModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: () => ({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: '__test__nestjs_seed',
            username: 'root',
            password: '',
            entities: [User, UserHistory],
            subscribers: [UserSubscriber],
            synchronize: false,
            migrationsRun: true,
            migrations: [
              CreateTableUser1576160977698,
              CreateTableUserHistory1576171192660,
              TestInsertUser1576872526662,
            ],
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/status (GET)', () => {
    return request(app.getHttpServer())
      .get('/status')
      .expect(204);
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200, []);
  });

  it('/user/:id (GET)', () => {
    const id = '1';
    return request(app.getHttpServer())
      .get(`/user/${id}`)
      .expect(404);
  });

  it('/user/fetch (POST)', () => {
    return request(app.getHttpServer())
      .post(`/user/fetch`)
      .send({ externalId: '23' })
      .expect(400);
  });

  it('/user/fetch (POST)', async () => {
    return request(app.getHttpServer())
      .post(`/user/fetch`)
      .send({ externalId: '4' })
      .expect(200, {});
  });

  afterAll(async () => {
    await app.close();
  });
});
