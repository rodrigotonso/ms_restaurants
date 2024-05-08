import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';

// entities
import { TablesEntity } from '../entities/tables.entity';

// dtos
import { TablesResponseDto } from '../dtos/tables/tables-response.dto';

@Injectable()
export class TablesMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, TablesEntity, TablesResponseDto);
    };
  }
}
