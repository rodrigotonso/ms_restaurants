import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginationResponseDto<Entity> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: Entity[];

  @ApiProperty({ type: () => PaginationMetaDto })
  readonly meta: PaginationMetaDto;

  constructor(data: Entity[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
