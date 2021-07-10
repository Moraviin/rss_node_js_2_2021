import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBoardsTable1624113529539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boards',
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            isGenerated: true,
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varChar',
          },
          {
            name: 'columns',
            type: 'jsonb',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('boards');
  }
}
