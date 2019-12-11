import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { JsonplaceholderService } from '../../src/jsonplaceholder/jsonplaceholder.service';
import { JsonplaceholderUser } from '../../src/jsonplaceholder/jsonplaceholder-user.model';

describe('JsonplaceholderService', () => {
  let service: JsonplaceholderService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonplaceholderService],
      imports: [HttpModule],
    }).compile();

    service = module.get<JsonplaceholderService>(JsonplaceholderService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findUsers', () => {
    it('should return users on call "GET /users" in http service', async () => {
      const result: AxiosResponse = {
        data: [{
          id: 1,
          name: 'fernando',
          username: 'nando',
          email: 'nando@4all.com',
        }],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));

      expect(await service.findUsers())
        .toEqual(result.data.map(item => new JsonplaceholderUser(item)));
    });

    it('should return empty array when response data is empty', async () => {
      const result: AxiosResponse = {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));

      expect(await service.findUsers()).toEqual([]);
    });

    it('should remove extra propertiers returned from api response data', async () => {
      const result: AxiosResponse = {
        data: [{
          id: 1,
          name: 'fernando',
          username: 'nando',
          email: 'nando@4all.com',
          unknownField: 'ola',
        }],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));

      expect(await service.findUsers())
        .toEqual(result.data.map(item => new JsonplaceholderUser(item)));
    });
  });
});
