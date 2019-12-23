import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';
import { InvalidExternalIdException } from './exception';
import { User } from './entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jsonplaceholderService: JsonplaceholderService,
  ) {}

  async fetch(): Promise<string[]> {
    const externalUsers = await this.jsonplaceholderService.findUsers();
    return await this.userRepository.syncByExternalIds(
      externalUsers.map(externalUser => ({
        externalId: externalUser.id.toString(),
        username: externalUser.username,
        name: externalUser.name,
        emailAddress: externalUser.email,
      })),
    );
  }

  findById(id: string) {
    return this.userRepository.findOne(id);
  }

  list() {
    return this.userRepository.find();
  }

  async fetchByExternalId(externalId: string): Promise<string> {
    const externalUser = await this.jsonplaceholderService.findUser(externalId);
    if (!externalUser) {
      throw new InvalidExternalIdException();
    }
    const [id] = await this.userRepository.syncByExternalIds([
      {
        externalId: externalUser.id.toString(),
        username: externalUser.username,
        name: externalUser.name,
        emailAddress: externalUser.email,
      },
    ]);

    return id;
  }
}
