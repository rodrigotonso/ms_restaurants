import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { CustomersEntity } from '../../entities/customers.entity';
import { BaseResponseDto } from '@/common/dtos/base-response.dto';

export class CustomersResponseDto extends MapperIntersectionType(
  MapperOmitType(CustomersEntity, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ]),
  BaseResponseDto,
) {
  constructor(params: CustomersResponseDto) {
    super();
    Object.assign(this, params);
  }
}
