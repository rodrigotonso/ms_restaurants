import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomersModule } from './customers/customers.module';
import { DatabaseModule } from './database/database.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomersModule,
    DatabaseModule,
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
