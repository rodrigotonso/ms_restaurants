import { PartialType } from '@nestjs/swagger';

import { ReservationsBodyDto } from './reservations-body.dto';

export class ReservationsBodyUpdateDto extends PartialType(
  ReservationsBodyDto,
) {
  constructor(params: ReservationsBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
