import { PORT, USE_FASTIFY } from './common/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Rss app')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addTag('moraviin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

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
