import { ApiProperty } from '@nestjs/swagger';

export class ValidationResultDto {
  @ApiProperty()
  readonly message: string;

  @ApiProperty({ required: false })
  readonly property?: string;

  @ApiProperty({ required: false })
  readonly value?: string;
}
