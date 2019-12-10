import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';

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

  async findById(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  list() {
    return this.userRepository.find();
  }
}
