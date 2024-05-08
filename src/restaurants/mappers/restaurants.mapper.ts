import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';

// entities
import { RestaurantsEntity } from '../entities/restaurants.entity';

// dtos
import { RestaurantsResponseDto } from '../dtos/restaurants/restaurants-response.dto';

@Injectable()
export class RestaurantsMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, RestaurantsEntity, RestaurantsResponseDto);
    };
  }
}
