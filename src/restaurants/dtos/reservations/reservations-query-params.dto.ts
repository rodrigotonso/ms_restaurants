import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { ReservationsFilterOptionsDto } from './reservations-filter-options.dto';

export class ReservationsQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  ReservationsFilterOptionsDto,
) {
  constructor(params: ReservationsQueryParamsDto) {
    super();
    Object.assign(this, params);
  }
}
