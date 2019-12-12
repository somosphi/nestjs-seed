import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableUserHistory1576171192660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'userHistory',
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
            name: 'userId',
            unsigned: true,
          },
          {
            type: 'varchar',
            length: '100',
            name: 'field',
          },
          {
            type: 'varchar',
            length: '100',
            name: 'value',
          },
          {
            type: 'enum',
            enum: ['CREATE', 'UPDATE'],
            name: 'method',
          },
          {
            type: 'datetime',
            name: 'createdAt',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('userHistory');
  }
}
