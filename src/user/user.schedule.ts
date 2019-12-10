import { Interval, NestSchedule } from 'nest-schedule';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserSchedule extends NestSchedule {

  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }

  @Interval(1000)
  async runFetch() {
    const fetchedIds = await this.userService.fetch();
    // tslint:disable-next-line:no-console
    console.log({ fetchedIds });
  }
}
