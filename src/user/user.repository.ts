import {
  Repository,
  EntityRepository,
  In,
  Transaction,
  TransactionRepository,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByExternalIds(externalIds: string[]): Promise<User[]> {
    return this.find({
      where: { externalId: In(externalIds) },
    });
  }

  @Transaction()
  async insertIfNotExists(
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

        if (!actualUser) {
          const result = await repository.insert(record);
          fetchedIds.push(result.identifiers.pop().id);
        }
      }),
    );

    return fetchedIds;
  }
}
