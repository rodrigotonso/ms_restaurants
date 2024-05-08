import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { TablesFilterOptionsDto } from './tables-filter-options.dto';

export class TablesQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  TablesFilterOptionsDto,
) {
  constructor(params: TablesQueryParamsDto) {
    super();
    Object.assign(this, params);
  }
}
