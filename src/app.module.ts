import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import config from '@/common/config/env.config';

import { CustomersModule } from './customers/customers.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env',
    }),
    CustomersModule,
    DatabaseModule,
    LoggerModule,
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
