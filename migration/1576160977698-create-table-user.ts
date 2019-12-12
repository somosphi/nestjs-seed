import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUser1576160977698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            type: 'bigint',
            name: 'id',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            type: 'bigint',
            name: 'externalId',
            unsigned: true,
            isUnique: true,
          },
          {
            type: 'varchar',
            length: '100',
            name: 'name',
          },
          {
            type: 'varchar',
            length: '100',
            name: 'username',
          },
          {
            type: 'varchar',
            length: '100',
            name: 'emailAddress',
          },
          {
            type: 'datetime',
            name: 'createdAt',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            type: 'datetime',
            name: 'updatedAt',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user');
  }
}
