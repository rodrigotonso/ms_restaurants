import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CustomersBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly totalPeople!: number;

  @ApiProperty()
  @IsString()
  readonly comments?: string;

  constructor(params: CustomersBodyDto) {
    Object.assign(this, params);
  }
}
