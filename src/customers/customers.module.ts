import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { CustomersEntity } from './entities/customers.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { CustomersOperationService } from './operation-services/customers.operation-service';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersOperationService, TypeOrmUtil],
})
export class CustomersModule {}
