import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private logger: Logger = new Logger("prueba");

  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    this.logger.log("esto es genial")
    return this.appService.getHello();
  }
}
