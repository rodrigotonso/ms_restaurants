import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { ReservationsEntity } from './entities/reservations.entity';
import { RestaurantsEntity } from './entities/restaurants.entity';
import { TablesEntity } from './entities/tables.entity';
import { TableAvailabilityEntity } from './entities/table_availability.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationsEntity,
      RestaurantsEntity,
      TablesEntity,
      TableAvailabilityEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class RestaurantsModule {}
