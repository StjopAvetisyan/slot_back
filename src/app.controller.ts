import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
@ApiTags('app')
export class AppController {
  constructor() {}

  @Get('/health')
  user() {
    return { message: 'I`m OK' };
  }
}
