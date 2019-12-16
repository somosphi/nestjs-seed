import { UserSubscriber } from 'src/user/user.subscriber';
import { Test, TestingModule } from '@nestjs/testing';
import { InsertEvent, EntityManager, UpdateEvent } from 'typeorm';
import { User, UserHistory } from 'src/user/entity';
import { UserHistoryMethod } from 'src/user/user.enum';

describe('User Subscriber', () => {
  let subscriber: UserSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSubscriber],
    }).compile();

    subscriber = module.get<UserSubscriber>(UserSubscriber);
  });

  it('should be defined', () => {
    expect(subscriber).toBeDefined();
  });

  describe('#afterInsert', () => {
    it('should create history for all fields without ID with method CREATE', async () => {
      const user = new User();
      user.id = '1';
      user.emailAddress = 'fulano@gmail.com';

      const event: InsertEvent<User> = {
        entity: user,
        manager: new EntityManager(null, null),
        connection: null,
        metadata: null,
        queryRunner: null,
      };

      jest
        .spyOn(event.manager, 'save')
        .mockImplementation(async () => undefined);

      const result = await subscriber.afterInsert(event);

      const history = new UserHistory();
      history.field = 'emailAddress';
      history.value = user.emailAddress;
      history.method = UserHistoryMethod.Create;
      history.userId = user.id;

      expect(result).toBeUndefined();
      expect(event.manager.save).toBeCalledTimes(1);
      expect(event.manager.save).toBeCalledWith(history);
    });
  });

  describe('#afterUpdate', () => {
    it('should create histories with only updated data with method UPDATE', async () => {
      const user = new User();
      user.id = '1';
      user.emailAddress = 'fulano@gmail.com';
      user.name = 'Fulano';

      const event: UpdateEvent<User> = {
        entity: user,
        manager: new EntityManager(null, null),
        connection: null,
        metadata: null,
        queryRunner: null,
        updatedColumns: [
          // @ts-ignore
          {
            propertyName: 'emailAddress',
          },
        ],
      };

      jest
        .spyOn(event.manager, 'save')
        .mockImplementation(async () => undefined);

      const result = await subscriber.afterUpdate(event);

      const history = new UserHistory();
      history.field = 'emailAddress';
      history.value = user.emailAddress;
      history.method = UserHistoryMethod.Update;
      history.userId = user.id;

      expect(result).toBeUndefined();
      expect(event.manager.save).toBeCalledTimes(1);
      expect(event.manager.save).toBeCalledWith(history);
    });
  });
});
