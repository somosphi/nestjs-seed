import { Injectable, HttpService } from '@nestjs/common';
import { JsonplaceholderUser } from './models/jsonplaceholder-user';

@Injectable()
export class JsonplaceholderService {
  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<JsonplaceholderUser[]> {
    const response = await this.httpService.get<any[]>('/users').toPromise();
    return response.data.map((item) => new JsonplaceholderUser(item));
  }
}
