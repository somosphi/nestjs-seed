import * as typeorm from 'typeorm';

export const mockTransaction = (repository: typeorm.Repository<any>): void => {
  jest.spyOn(typeorm, 'getConnection').mockImplementation(() => ({
    // @ts-ignore
    manager: {
      transaction: (cb: any) =>
        cb({
          getCustomRepository: () => repository,
        }),
    },
  }));
};
