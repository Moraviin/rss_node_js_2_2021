import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  forwardRef,
  HttpException,
  Inject,
} from '@nestjs/common';
import { LoggerService } from './logger.middleware';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(forwardRef(() => LoggerService))
    private loggerService: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.loggerService.error('error', exception);

    response
      .status(exception.getStatus() || 500)
      .send(exception.getResponse() || 'Internal server problem');
  }
}
