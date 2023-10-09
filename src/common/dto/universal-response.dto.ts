import { ApiProperty } from '@nestjs/swagger';
import { Nullable } from '../typeguards';
import { LogicalErrorFormat } from '../index';

export enum UniversalResponseStatus {
  OK = 'OK',
  ERROR = 'ERROR',
}

export type UniversalResponse<T> = {
  data: T;
  status: UniversalResponseStatus;
  error: Nullable<LogicalErrorFormat>;
};

export class UniversalResponseDTO<T> implements UniversalResponse<T> {
  data: T;

  @ApiProperty({ example: null })
  error: Nullable<LogicalErrorFormat>;
  @ApiProperty({ example: 'OK' })
  status: UniversalResponseStatus;
}
