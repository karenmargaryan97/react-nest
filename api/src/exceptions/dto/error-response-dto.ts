import { ApiProperty } from '@nestjs/swagger';
import { ValidationResultDto } from './validation-result-dto';

export class ErrorResponseDto {
  @ApiProperty({ type: () => [ValidationResultDto] })
  readonly errors: ValidationResultDto[];

  @ApiProperty()
  readonly path: string;

  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly timestamp: string;
}
