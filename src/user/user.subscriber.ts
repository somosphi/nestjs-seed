import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EntityManager,
} from 'typeorm';
import { User } from './entity/user.entity';
import { UserHistory } from './entity/user-history.entity';
import { UserHistoryMethod } from './user.enum';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    await this.createHistories(
      event.entity,
      UserHistoryMethod.Create,
      event.manager,
    );
  }

  async afterUpdate(event: UpdateEvent<User>) {
    const updatedData: any = { id: event.entity.id };
    event.updatedColumns.forEach(({ propertyName }) => {
      updatedData[propertyName] = event.entity[propertyName];
    });
    await this.createHistories(
      updatedData,
      UserHistoryMethod.Update,
      event.manager,
    );
  }

  private async createHistories(
    data: any,
    method: UserHistoryMethod,
    manager: EntityManager,
  ): Promise<void> {
    await Promise.all(
      Object.keys(data)
        .filter(key => !['id'].includes(key))
        .map(async key => {
          const history = new UserHistory();
          history.field = key;
          history.value = data[key].toString();
          history.method = method;
          history.userId = data.id;
          await manager.save(history);
        }),
    );
  }
}
