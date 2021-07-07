import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import authenticationMiddleware from './authtenticate-service';
import loginRouter from './resources/login/login.router';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { logMethod, logError, errorHandler } from './logger-service';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(logMethod);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use(authenticationMiddleware);

app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);

app.use(errorHandler);

process.on('uncaughtException', err => {

  logError('error')(err, () => process.exit(1));
});

process.on('unhandledRejection', async (_promiseInfo, promise) => {
  const err = await promise.catch(error => error);
  logError('promise')(err, () => process.exit(1));

});

export default app;
