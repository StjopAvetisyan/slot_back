import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { GameService } from './game.service';
import { ConfigResDto } from './dto/config.res.dto';
import { UniversalResponseInterceptor } from '../common/dto/universal-response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { UniversalResponse } from '../common/universal-response.decorator';
import { SpinResDto } from './dto/spin.res.dto';

@Controller('api/game')
@ApiTags('game')
@UseInterceptors(UniversalResponseInterceptor)
export class GameController {
  constructor(public readonly gameService: GameService) {}

  @Get('/config')
  @UniversalResponse(ConfigResDto)
  async getGeneralSettings(): Promise<ConfigResDto> {
    return this.gameService.getConfigForUser();
  }

  @Get('/spin')
  @UniversalResponse(SpinResDto)
  async spin(
    @Query('bet_count') bet_count: number,
    @Query('id') id: string,
  ): Promise<SpinResDto> {
    return this.gameService.spin(Number(bet_count), id);
  }
}
