import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class ReservationsBodyDto {
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
  readonly customerId!: number;

  @ApiProperty()
  @IsDate()
  readonly date?: Date;

  constructor(params: ReservationsBodyDto) {
    Object.assign(this, params);
  }
}
