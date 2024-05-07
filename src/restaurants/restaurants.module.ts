import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { RestaurantsEntity } from './entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantsEntity])],
  controllers: [],
  providers: [],
})
export class RestaurantsModule {}
