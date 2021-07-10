import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './config';
import { UserEntity } from '../entities/users';
import { TaskEntity } from '../entities/tasks';
import { BoardEntity } from '../entities/boards';

export const config = {
  name: 'default',
  type: 'postgres',
  synchronize: false,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [UserEntity, TaskEntity, BoardEntity],
  migrations: ['migrations/**.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
} as ConnectionOptions;

export default config;
