import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import request from 'supertest';
import moment from 'moment';
import { Connection } from 'typeorm';
import { AppModule } from 'src/app.module';
import { User } from 'src/user/entity';
import { ConfigService } from 'src/config/config.service';
import { InvalidExternalIdException } from 'src/user/exception';
import { UserRepository } from 'src/user/user.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: UserRepository;

  beforeAll(async () => {
    const configService = new ConfigService('.env');
    configService.envConfig.typeormDatabase += '_test';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(configService)
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const connection = app.get(Connection);
    repository = connection.manager.getCustomRepository(UserRepository);

    await connection.dropDatabase();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    await connection.dropDatabase();
    await app.close();
  });

  it('/status (GET) with status 204', () => {
    return request(app.getHttpServer())
      .get('/status')
      .expect(204);
  });

  it('/user (GET) with status 200, array to be empty', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200, []);
  });

  it('/user (GET) with status 200, array with users', async () => {
    await repository.save([
      {
        externalId: '3',
        name: 'gilberto da silva',
        username: 'gil',
        emailAddress: 'gil.br@test.com',
        createdAt: moment.utc().toDate(),
        updatedAt: moment.utc().toDate(),
        histories: [],
      },
      {
        externalId: '5',
        name: 'daniel da rosa',
        username: 'dani',
        emailAddress: 'dani.br@test.com',
        createdAt: moment.utc().toDate(),
        updatedAt: moment.utc().toDate(),
        histories: [],
      },
    ]);

    const response = await request(app.getHttpServer()).get('/user');

    expect(response.body).toHaveLength(2);
    expect(response.status).toEqual(200);
  });

  it('/user/:id (GET) with successfully', async () => {
    const user = new User({
      externalId: '3',
      name: 'gilberto da silva',
      username: 'gil',
      emailAddress: 'gil.br@test.com',
    });

    await repository.insert(user);
    const response = await request(app.getHttpServer()).get(`/user/${user.id}`);

    expect(response.body).toMatchObject(user);
    expect(response.status).toEqual(200);
  });

  it('/user/:id (GET) with status 404', () => {
    const id = '61';
    return request(app.getHttpServer())
      .get(`/user/${id}`)
      .expect(404, new NotFoundException().getResponse());
  });

  it('/user/fetch (POST) INVALID_EXTERNAL_ID', () => {
    const err = new InvalidExternalIdException();
    return request(app.getHttpServer())
      .post(`/user/fetch`)
      .send({ externalId: '23' })
      .expect(400, err.toJSON());
  });

  it('/user/fetch (POST) with successfuly', async () => {
    const externalId = '1';
    await request(app.getHttpServer())
      .post(`/user/fetch`)
      .send({ externalId })
      .expect(204);

    const res = await request(app.getHttpServer()).get('/user');
    const user = res.body.find(data => data.externalId === externalId);
    expect(user).not.toBeUndefined();
  });
});
