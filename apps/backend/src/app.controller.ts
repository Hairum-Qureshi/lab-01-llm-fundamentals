import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  serverStatus() {
    return {
      status: 'Server is running',
      timestamp: new Date().toISOString(),
    };
  }
}
