import { Injectable, HttpService } from '@nestjs/common';
import { JsonplaceholderUser } from './jsonplaceholder-user.model';
import { HttpIntegrationService } from 'src/shared/http-integration.service';

@Injectable()
export class JsonplaceholderService extends HttpIntegrationService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

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
    } catch (err) {
      if (this.isNotFoundError(err)) {
        return null;
      }
      throw err;
    }
  }
}
