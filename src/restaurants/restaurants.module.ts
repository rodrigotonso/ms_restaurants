import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { ReservationsEntity } from './entities/reservations.entity';
import { RestaurantsEntity } from './entities/restaurants.entity';
import { TablesEntity } from './entities/tables.entity';
import { TableAvailabilityEntity } from './entities/table-availability.entity';

import { ReservationsController } from './controllers/reservations/reservations.controller';
import { RestaurantsController } from './controllers/restaurants/restaurants.controller';

import { ReservationsOperationService } from './operation-services/reservations.operation-service';
import { RestaurantsOperationService } from './operation-services/restaurants.operation-service';

import { ReservationsService } from './services/reservations.service';
import { RestaurantsService } from './services/restaurants.service';

import { TypeOrmUtil } from '@/common/utils/typeorm.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationsEntity,
      RestaurantsEntity,
      TablesEntity,
      TableAvailabilityEntity,
    ]),
  ],
  controllers: [ReservationsController, RestaurantsController],
  providers: [
    ReservationsOperationService,
    RestaurantsOperationService,
    ReservationsService,
    RestaurantsService,
    TypeOrmUtil,
  ],
})
export class RestaurantsModule {}
