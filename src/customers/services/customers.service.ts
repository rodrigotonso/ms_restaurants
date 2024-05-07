import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseCrudService } from '@/common/services/base-crud.service';
import { CustomersEntity } from '../entities/customers.entity';
import { CustomersBodyDto } from '../dtos/customers/customers-body.dto';

@Injectable()
export class CustomersService extends BaseCrudService<
  CustomersEntity,
  CustomersBodyDto
> {
  private className = CustomersService.name;

  constructor(
    @InjectRepository(CustomersEntity)
    private customersRepository: Repository<CustomersEntity>,
  ) {
    super(customersRepository);
  }
}
