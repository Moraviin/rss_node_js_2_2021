import { ConnectionOptions } from 'typeorm';
import { UserEntity } from '../resources/entities/users';
import { TaskEntity } from '../resources/entities/tasks';
import { BoardEntity } from '../resources/entities/boards';

export const config = {
  name: 'default',
  type: 'postgres',
  synchronize: false,
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [UserEntity, TaskEntity, BoardEntity],
  migrations: ['src/migrations/**.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
} as ConnectionOptions;

export default config;
