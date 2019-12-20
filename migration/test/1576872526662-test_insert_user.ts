import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import moment = require('moment');

export class TestInsertUser1576872526662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values({
        id: '13',
        username: 'ciro',
        emailAddress: 'teste@teste',
        name: 'Ciro s',
        histories: [],
        externalId: '21',
        createdAt: moment.utc().toDate(),
        updatedAt: moment.utc().toDate(),
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user');
  }
}
