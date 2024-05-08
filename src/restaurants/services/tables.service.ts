import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseCrudService } from '@/common/services/base-crud.service';
import { TablesEntity } from '../entities/tables.entity';
import { TablesBodyDto } from '../dtos/tables/tables-body.dto';
import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class TablesService extends BaseCrudService<
  TablesEntity,
  TablesBodyDto
> {
  private className = TablesService.name;

  constructor(
    @InjectRepository(TablesEntity)
    private tablesRepository: Repository<TablesEntity>,
    private loggerService: LoggerService,
  ) {
    super(tablesRepository, loggerService);
  }
}
