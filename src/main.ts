import { PORT, USE_FASTIFY } from './common/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthtenticateGuard } from './authtenticate.guard';
import { LoggerService } from './logger.middleware';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from './all-exceptions-filter.filter';
import { AllExceptionInterceptor } from './all-exception.interceptor';

const logger = new LoggerService();

async function bootstrap() {
  const adapter = USE_FASTIFY ? new FastifyAdapter() : new ExpressAdapter();

  const app = await NestFactory.create(AppModule, adapter);
  const logger = new LoggerService();
  app.useGlobalGuards(new AuthtenticateGuard());

  app.use(logger.use);
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.useGlobalInterceptors(new AllExceptionInterceptor());
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();

process.on('uncaughtException', (err) => {
  logger.error('error', err, () => process.exit(1));
});

process.on('unhandledRejection', async (_promiseInfo, promise) => {
  const err = await promise.catch((error) => error);
  logger.error('promise', err, () => process.exit(1));
});
