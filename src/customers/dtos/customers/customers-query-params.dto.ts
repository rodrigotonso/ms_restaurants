import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { CustomersFilterOptionsDto } from './customers-filter-options.dto';

export class CustomersQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  CustomersFilterOptionsDto,
) {
  constructor(params: CustomersQueryParamsDto) {
    super();
    Object.assign(this, params);
  }
}
