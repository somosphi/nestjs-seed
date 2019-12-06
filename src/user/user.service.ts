import { Injectable } from '@nestjs/common';
import { UserServiceContract } from './contract/user.service';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService implements UserServiceContract {
  constructor(private readonly userRepository: UserRepository) {}
  async fetch() {
    //
  }

  findById(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  list() {
    return this.userRepository.find();
  }
}
