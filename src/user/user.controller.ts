import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UniversalResponseInterceptor } from '../common/dto/universal-response.interceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/user')
@UseInterceptors(UniversalResponseInterceptor)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getCurrentUser(@Query('id') id: string) {
    return this.userService.getUser(id ?? undefined);
  }
}
