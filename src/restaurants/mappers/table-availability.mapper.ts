import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';

// entities
import { ReservationsEntity } from '../entities/reservations.entity';

// dtos
import { ReservationsResponseDto } from '../dtos/reservations/reservations-response.dto';

@Injectable()
export class ReservationsMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ReservationsEntity, ReservationsResponseDto);
    };
  }
}
