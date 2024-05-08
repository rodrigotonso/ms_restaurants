import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TableAvailabilityBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly tableId!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly weekDay!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly startHour!: string;

  constructor(params: TableAvailabilityBodyDto) {
    Object.assign(this, params);
  }
}
