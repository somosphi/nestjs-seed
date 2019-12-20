import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TestDeleteUser1576872526662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.createQueryBuilder()
      .delete()
      .from('user')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user');
  }
}
