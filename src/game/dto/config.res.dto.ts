import { ApiProperty } from '@nestjs/swagger';
export class IPrize {
  @ApiProperty()
  id: number;

  @ApiProperty()
  figure: string;

  @ApiProperty()
  prizes_count: number;
}
export class ConfigResDto {
  @ApiProperty({ type: IPrize, isArray: true })
  prizes: IPrize[];

  @ApiProperty()
  possible_bets: number[];
}
