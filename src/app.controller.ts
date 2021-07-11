import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('kek')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cheburek')
  getHello(): string {
    return this.appService.getHello();
  }
}
