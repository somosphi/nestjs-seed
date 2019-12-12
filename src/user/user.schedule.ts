import { Interval, NestSchedule } from 'nest-schedule';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserSchedule extends NestSchedule {
  private readonly logger = new Logger(UserSchedule.name);

  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }

  @Interval(1000)
  async runFetch() {
    try {
      const fetchedIds = await this.userService.fetch();
      this.logger.log(`Successfully fetched users [${fetchedIds.join(', ')}]`);
    } catch (err) {
      this.logger.error(`Failed to fetch users (${err.stack})`);
    }
  }
}
