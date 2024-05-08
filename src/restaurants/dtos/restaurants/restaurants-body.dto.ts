import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RestaurantsBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsString()
  readonly location?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly image!: string;

  constructor(params: RestaurantsBodyDto) {
    Object.assign(this, params);
  }
}
