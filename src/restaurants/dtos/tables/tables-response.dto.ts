import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { TablesEntity } from '../../entities/tables.entity';
import { BaseResponseDto } from '@/common/dtos/base-response.dto';

export class TablesResponseDto extends MapperIntersectionType(
  MapperOmitType(TablesEntity, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
  BaseResponseDto,
) {
  constructor(params: TablesResponseDto) {
    super();
    Object.assign(this, params);
  }
}
