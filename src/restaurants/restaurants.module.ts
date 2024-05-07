import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { RestaurantsEntity } from './entities/restaurants.entity';
import { TablesEntity } from './entities/tables.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantsEntity, TablesEntity])],
  controllers: [],
  providers: [],
})
export class RestaurantsModule {}
