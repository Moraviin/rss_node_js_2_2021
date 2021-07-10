import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserEntity } from '../src/entities/users';
import { hashPassword } from '../src/authtenticate-service';

export class CreateUserTable1624112117662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            isGenerated: true,
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varChar',
          },
          {
            name: 'login',
            type: 'varChar',
          },
          {
            name: 'password',
            type: 'varChar',
          },
        ],
      }),
    );

    const adminPassword = hashPassword('admin');
    queryRunner.manager.insert(UserEntity, {
      name: 'admin',
      login: 'admin',
      password: adminPassword,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
