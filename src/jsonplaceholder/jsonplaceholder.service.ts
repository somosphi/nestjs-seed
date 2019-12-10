import { Injectable, HttpService } from '@nestjs/common';
import { JsonplaceholderUser } from './jsonplaceholder-user.model';

@Injectable()
export class JsonplaceholderService {
  constructor(private readonly httpService: HttpService) {}

  async findUsers(): Promise<JsonplaceholderUser[]> {
    const response = await this.httpService.get<any[]>('/users').toPromise();
    return response.data.map(item => new JsonplaceholderUser(item));
  }
}
