import { ApiProperty } from '@nestjs/swagger';

export class BasePropertyDto {
  @ApiProperty()
  id!: number;

  constructor(params: BasePropertyDto) {
    Object.assign(this, params);
  }
}
