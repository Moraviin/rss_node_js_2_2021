import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { finished } from 'stream';

import * as fs from 'fs';

const logWriteStream = fs.createWriteStream('./LOGS/appLog.log', {
  flags: 'a',
});
const errWriteStream = fs.createWriteStream('./LOGS/errLog.log', {
  flags: 'a',
});

const formatQueryData = (req, res) => {
  const reqData = `
  [${new Date()}]
  [${req.method}] ${req.originalUrl};
  Query params: ${JSON.stringify(req.query)};
  Body: ${JSON.stringify(req.body)};
  Response status ${res.statusCode};
  `;

  return reqData;
};

@Injectable()
export class LoggerService implements NestMiddleware {
  use(req, res, next) {
    next();
    finished(res, () => logWriteStream.write(formatQueryData(req, res)));
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error(type = 'error', err, cb = () => {}) {
    errWriteStream.write(
      `
    [${new Date()}]
    [Uncaught ${type === 'promise' ? 'promise rejection' : 'exception'}] ${err?.name || ''}
    info: ${JSON.stringify(err?.message || '')}
    ${err?.stack ? `${err.stack}` : ''}`,
      cb,
    );
  }
}
