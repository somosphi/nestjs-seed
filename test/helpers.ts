import * as typeorm from 'typeorm';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const mockTransaction = (repository: typeorm.Repository<any>): void => {
  const connection = mockInstance<typeorm.Connection>({
    manager: {
      transaction: (cb: any) =>
        cb({
          getCustomRepository: () => repository,
        }),
    },
  });
  jest.spyOn(typeorm, 'getConnection').mockImplementation(() => connection);
};

export const mockInstance = <T>(data: RecursivePartial<T>) => data as T;
