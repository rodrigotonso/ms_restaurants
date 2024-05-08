import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { ReservationsEntity } from '../../entities/reservations.entity';
import { BaseResponseDto } from '@/common/dtos/base-response.dto';

export class ReservationsResponseDto extends MapperIntersectionType(
  MapperOmitType(ReservationsEntity, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ]),
  BaseResponseDto,
) {
  constructor(params: ReservationsResponseDto) {
    super();
    Object.assign(this, params);
  }
}
