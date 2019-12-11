import { Injectable, HttpService } from '@nestjs/common';
import { JsonplaceholderUser } from './jsonplaceholder-user.model';

@Injectable()
export class JsonplaceholderService {
  constructor(private readonly httpService: HttpService) {}

  async findUsers(): Promise<JsonplaceholderUser[]> {
    const response = await this.httpService.get<any[]>('/users').toPromise();
    return response.data.map(item => new JsonplaceholderUser(item));
  }

  async findUser(id: string): Promise<JsonplaceholderUser> {
    try {
      const response = await this.httpService
        .get<any>(`/users/${id}`)
        .toPromise();

      return new JsonplaceholderUser(response.data);
    } catch (error) {
      const errorStatus = error.response && error.response.status;
      if (errorStatus === 404) {
        return null;
      }

      throw error;
    }
  }
}
