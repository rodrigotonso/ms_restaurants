import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { TablesService } from '../services/tables.service';
import { TablesEntity } from '../entities/tables.entity';
import { LoggerService } from '@/logger/services/logger.service';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';

// dtos
import { TablesBodyDto } from '../dtos/tables/tables-body.dto';
import { TablesBodyUpdateDto } from '../dtos/tables/tables-body-update.dto';
import { TablesResponseDto } from '../dtos/tables/tables-response.dto';
import { TablesFilterOptionsDto } from '../dtos/tables/tables-filter-options.dto';
import { TablesQueryParamsDto } from '../dtos/tables/tables-query-params.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

@Injectable()
export class TablesOperationService {
  private className = TablesOperationService.name;

  constructor(
    private tablesService: TablesService,
    private loggerService: LoggerService,
    private typeOrmUtil: TypeOrmUtil,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(payload: TablesBodyDto): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
        payload,
      });
      const createdEntity = await this.tablesService.create({ payload });
      const response = this.mapper.map(
        createdEntity,
        TablesEntity,
        TablesResponseDto,
      );
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'create',
        payload: e,
      });
      throw e;
    }
  }

  async findOne(entity: TablesEntity): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
        payload: entity,
      });
      const response = this.mapper.map(entity, TablesEntity, TablesResponseDto);
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findOne',
        payload: e,
      });
      throw e;
    }
  }

  async findAll(
    queryParams: TablesQueryParamsDto,
  ): Promise<PaginationResponseDto<TablesResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAll',
        payload: queryParams,
      });
      const { order, page, take, ...others } = queryParams;
      const paginationOptions = new PaginationOptionsDto({ order, page, take });
      const filterOptions = new TablesFilterOptionsDto(others);
      const where =
        this.typeOrmUtil.buidWhereObject<TablesFilterOptionsDto>(filterOptions);
      const { data, meta } = await this.tablesService.findAll({
        paginationOptions,
        where,
      });
      const newData = data.map((restaurant) => {
        return this.mapper.map(restaurant, TablesEntity, TablesResponseDto);
      });
      const response = new PaginationResponseDto<TablesResponseDto>(
        newData,
        meta,
      );
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findAll',
        payload: e,
      });
      throw e;
    }
  }

  async update(
    id: number,
    payload: TablesBodyUpdateDto,
  ): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
        payload: { ...payload, id },
      });
      let response: TablesResponseDto | undefined = undefined;
      const updatedEntity = await this.tablesService.update({
        id,
        payload,
      });
      if (updatedEntity) {
        response = this.mapper.map(
          updatedEntity,
          TablesEntity,
          TablesResponseDto,
        );
      }
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'update',
        payload: e,
      });
      throw e;
    }
  }

  async remove(id: number): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
        payload: { id },
      });
      let response: TablesResponseDto | undefined = undefined;
      const deletedEntity = await this.tablesService.remove({ id });
      if (deletedEntity) {
        response = this.mapper.map(
          deletedEntity,
          TablesEntity,
          TablesResponseDto,
        );
      }
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'remove',
        payload: e,
      });
      throw e;
    }
  }
}
