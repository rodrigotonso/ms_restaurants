import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { CustomersEntity } from './entities/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  controllers: [],
  providers: [],
})
export class CustomersModule {}
