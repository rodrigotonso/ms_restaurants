import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { RestaurantsFilterOptionsDto } from './restaurants-filter-options.dto';

export class RestaurantsQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  RestaurantsFilterOptionsDto,
) {
  constructor(params: RestaurantsQueryParamsDto) {
    super();
    Object.assign(this, params);
  }
}
