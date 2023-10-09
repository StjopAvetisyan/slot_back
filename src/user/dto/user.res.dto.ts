import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  uid: string;
  @ApiProperty()
  current_points: number;
}
