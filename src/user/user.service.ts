import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';
import { InvalidExternalIdException } from './exception';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jsonplaceholderService: JsonplaceholderService,
  ) {}

  async fetch(): Promise<string[]> {
    const externalUsers = await this.jsonplaceholderService.findUsers();
    return await this.userRepository.insertIfNotExists(
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

  async fetchUser(id: string): Promise<string[]> {
    const externalUser = await this.jsonplaceholderService.findUser(id);

    if (!externalUser) {
      throw new InvalidExternalIdException();
    }

    return await this.userRepository.insertIfNotExists([
      {
        externalId: externalUser.id.toString(),
        username: externalUser.username,
        name: externalUser.name,
        emailAddress: externalUser.email,
      },
    ]);
  }
}
