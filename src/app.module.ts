import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
