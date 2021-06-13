import express, { NextFunction } from 'express';
import { finished } from 'stream';

import fs from 'fs';

const logWriteStream = fs.createWriteStream('./LOGS/appLog.log', { flags: 'a' });
const errWriteStream = fs.createWriteStream('./LOGS/errLog.log', { flags: 'a' });

const formatQueryData = (req: express.Request, res: express.Response) => {
  const reqData = `
  [${new Date()}]
  [${req.method}] ${req.originalUrl};
  Query params: ${JSON.stringify(req.params)};
  Body: ${JSON.stringify(req.body)};
  Response status ${res.statusCode};
  `;

  return reqData;
};

export const logMethod = (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
): void => {
  next();
  finished(res, () => logWriteStream.write(formatQueryData(req, res)));
};

export const logError = (type: 'promise' | 'error') => (err: Error): void => {
  errWriteStream.write(`
  [${new Date()}]
  [Uncaught ${type === 'promise' ? 'promise rejection' : 'exception'}] ${err.name || ''}
  info: ${JSON.stringify(err.message)}
  ${err.stack ? `${err.stack}` : ''}`);
};

export const errorHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
): void => {
  logError('error')(err);
  res.status(500).send('Something went wrong!');
};
