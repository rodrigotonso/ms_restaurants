import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';

// entities
import { TableAvailabilityEntity } from '../entities/table-availability.entity';

// dtos
import { TableAvailabilityResponseDto } from '../dtos/table-availability/table-availability-response.dto';

@Injectable()
export class TableAvailabilityMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, TableAvailabilityEntity, TableAvailabilityResponseDto);
    };
  }
}
