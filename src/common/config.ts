import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const envVariables = {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
};

if (envVariables.JWT_SECRET_KEY === undefined) {
  throw new Error('JWT_SECRET_KEY absent');
}

export const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE } = envVariables;
