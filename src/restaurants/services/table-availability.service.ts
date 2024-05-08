import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseCrudService } from '@/common/services/base-crud.service';
import { TableAvailabilityEntity } from '../entities/table-availability.entity';
import { TableAvailabilityBodyDto } from '../dtos/table-availability/table-availability-body.dto';
import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class TableAvailabilityService extends BaseCrudService<
  TableAvailabilityEntity,
  TableAvailabilityBodyDto
> {
  private className = TableAvailabilityService.name;

  constructor(
    @InjectRepository(TableAvailabilityEntity)
    private tableAvailabilityRepository: Repository<TableAvailabilityEntity>,
    private loggerService: LoggerService,
  ) {
    super(tableAvailabilityRepository, loggerService);
  }
}
