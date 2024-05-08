import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TablesBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly restaurantId!: number;

  @ApiProperty()
  @IsString()
  readonly friendlyName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly desiredPeople?: number;

  @ApiProperty()
  @IsInt()
  readonly minPeople?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly maxPeople!: number;

  constructor(params: TablesBodyDto) {
    Object.assign(this, params);
  }
}
