import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { TableAvailabilityEntity } from '../../entities/table-availability.entity';
import { BaseResponseDto } from '@/common/dtos/base-response.dto';

export class TableAvailabilityResponseDto extends MapperIntersectionType(
  MapperOmitType(TableAvailabilityEntity, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ]),
  BaseResponseDto,
) {
  constructor(params: TableAvailabilityResponseDto) {
    super();
    Object.assign(this, params);
  }
}
