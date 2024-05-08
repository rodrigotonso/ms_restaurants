import { PartialType } from '@nestjs/swagger';

import { TableAvailabilityBodyDto } from './table-availability-body.dto';

export class TableAvailabilityBodyUpdateDto extends PartialType(
  TableAvailabilityBodyDto,
) {
  constructor(params: TableAvailabilityBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
