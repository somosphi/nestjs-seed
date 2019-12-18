import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from 'src/config/config.service';

const database = new Database(':memory:');
database.get('SELECT 1', (err, data) => {
  if (err) {
    console.log(err.stack);
    process.exit(0);
  }
});

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService('env.e2e'),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/status (GET)', () => {
    return request(app.getHttpServer()).get('/status').expect(204);
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer()).get('/user').expect(200, []);
  });
});
