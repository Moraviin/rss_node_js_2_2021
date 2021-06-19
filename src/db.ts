import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { config } from './common/ormconfig';

export default createConnection(config);
