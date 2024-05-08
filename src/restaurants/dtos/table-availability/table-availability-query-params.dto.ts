import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { TableAvailabilityFilterOptionsDto } from './table-availability-filter-options.dto';

export class TableAvailabilityQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  TableAvailabilityFilterOptionsDto,
) {
  constructor(params: TableAvailabilityQueryParamsDto) {
    super();
    Object.assign(this, params);
  }
}
