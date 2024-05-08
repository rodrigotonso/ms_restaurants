import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { ReservationsEntity } from './entities/reservations.entity';
import { RestaurantsEntity } from './entities/restaurants.entity';
import { TablesEntity } from './entities/tables.entity';
import { TableAvailabilityEntity } from './entities/table-availability.entity';

import { ReservationsController } from './controllers/reservations/reservations.controller';
import { RestaurantsController } from './controllers/restaurants/restaurants.controller';
import { TableAvailabilityController } from './controllers/table-availability/table-availability.controller';
import { TablesController } from './controllers/tables/tables.controller';

import { ReservationsOperationService } from './operation-services/reservations.operation-service';
import { RestaurantsOperationService } from './operation-services/restaurants.operation-service';
import { TableAvailabilityOperationService } from './operation-services/table-availability.operation-service';
import { TablesOperationService } from './operation-services/tables.operation-service';

import { ReservationsService } from './services/reservations.service';
import { RestaurantsService } from './services/restaurants.service';
import { TableAvailabilityService } from './services/table-availability.service';
import { TablesService } from './services/tables.service';

import { ReservationsMapper } from './mappers/table-availability.mapper';
import { RestaurantsMapper } from './mappers/restaurants.mapper';
import { TableAvailabilityMapper } from './mappers/reservations.mapper';
import { TablesMapper } from './mappers/tables.mapper';

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
  controllers: [
    ReservationsController,
    RestaurantsController,
    TableAvailabilityController,
    TablesController,
  ],
  providers: [
    ReservationsOperationService,
    RestaurantsOperationService,
    TableAvailabilityOperationService,
    TablesOperationService,
    ReservationsService,
    RestaurantsService,
    TableAvailabilityService,
    TablesService,
    ReservationsMapper,
    RestaurantsMapper,
    TableAvailabilityMapper,
    TablesMapper,
    TypeOrmUtil,
  ],
})
export class RestaurantsModule {}
