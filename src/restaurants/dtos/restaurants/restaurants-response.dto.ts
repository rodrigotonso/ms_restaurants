import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { RestaurantsEntity } from '../../entities/restaurants.entity';
import { BaseResponseDto } from '@/common/dtos/base-response.dto';

export class RestaurantsResponseDto extends MapperIntersectionType(
  MapperOmitType(RestaurantsEntity, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ]),
  BaseResponseDto,
) {
  constructor(params: RestaurantsResponseDto) {
    super();
    Object.assign(this, params);
  }
}
