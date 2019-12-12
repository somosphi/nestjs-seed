import {
  Repository,
  EntityRepository,
  In,
  Transaction,
  TransactionRepository,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByExternalIds(externalIds: string[]): Promise<User[]> {
    return this.find({
      where: { externalId: In(externalIds) },
    });
  }

  @Transaction()
  async syncByExternalIds(
    records: Array<Partial<User>>,
    @TransactionRepository() repository?: UserRepository,
  ): Promise<string[]> {
    const externalIds = records.map(record => record.externalId);
    const actualUsers = await repository.findByExternalIds(externalIds);
    const fetchedIds: string[] = [];

    await Promise.all(
      records.map(async record => {
        const actualUser = actualUsers.find(
          user => user.externalId === record.externalId,
        );

        if (actualUser) {
          actualUser.emailAddress = record.emailAddress;
          actualUser.name = record.name;
          actualUser.username = record.username;
          await repository.save(actualUser);
          fetchedIds.push(actualUser.id);
        } else {
          const user = new User();
          user.emailAddress = record.emailAddress;
          user.name = record.name;
          user.username = record.username;
          user.externalId = record.externalId;
          await repository.save(user);
          fetchedIds.push(user.id);
        }
      }),
    );

    return fetchedIds;
  }
}
