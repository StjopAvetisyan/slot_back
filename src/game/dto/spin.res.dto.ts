import { ApiProperty } from '@nestjs/swagger';

export class SpinResDto {
  @ApiProperty({ isArray: true })
  positions: number[];

  @ApiProperty()
  win: boolean;

  @ApiProperty()
  prize: number;

  @ApiProperty()
  current_points: number;
}
