import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { TableAvailabilityService } from '../services/table-availability.service';
import { TableAvailabilityEntity } from '../entities/table-availability.entity';
import { LoggerService } from '@/logger/services/logger.service';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';

// dtos
import { TableAvailabilityBodyDto } from '../dtos/table-availability/table-availability-body.dto';
import { TableAvailabilityBodyUpdateDto } from '../dtos/table-availability/table-availability-body-update.dto';
import { TableAvailabilityResponseDto } from '../dtos/table-availability/table-availability-response.dto';
import { TableAvailabilityFilterOptionsDto } from '../dtos/table-availability/table-availability-filter-options.dto';
import { TableAvailabilityQueryParamsDto } from '../dtos/table-availability/table-availability-query-params.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

@Injectable()
export class TableAvailabilityOperationService {
  private className = TableAvailabilityOperationService.name;

  constructor(
    private tableAvailabilityService: TableAvailabilityService,
    private loggerService: LoggerService,
    private typeOrmUtil: TypeOrmUtil,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(
    payload: TableAvailabilityBodyDto,
  ): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
        payload,
      });
      const createdEntity = await this.tableAvailabilityService.create({
        payload,
      });
      const response = this.mapper.map(
        createdEntity,
        TableAvailabilityEntity,
        TableAvailabilityResponseDto,
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

  async findOne(
    entity: TableAvailabilityEntity,
  ): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
        payload: entity,
      });
      const response = this.mapper.map(
        entity,
        TableAvailabilityEntity,
        TableAvailabilityResponseDto,
      );
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
    queryParams: TableAvailabilityQueryParamsDto,
  ): Promise<PaginationResponseDto<TableAvailabilityResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAll',
        payload: queryParams,
      });
      const { order, page, take, ...others } = queryParams;
      const paginationOptions = new PaginationOptionsDto({ order, page, take });
      const filterOptions = new TableAvailabilityFilterOptionsDto(others);
      const where =
        this.typeOrmUtil.buidWhereObject<TableAvailabilityFilterOptionsDto>(
          filterOptions,
        );
      const { data, meta } = await this.tableAvailabilityService.findAll({
        paginationOptions,
        where,
      });
      const newData = data.map((restaurant) => {
        return this.mapper.map(
          restaurant,
          TableAvailabilityEntity,
          TableAvailabilityResponseDto,
        );
      });
      const response = new PaginationResponseDto<TableAvailabilityResponseDto>(
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
    payload: TableAvailabilityBodyUpdateDto,
  ): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
        payload: { ...payload, id },
      });
      let response: TableAvailabilityResponseDto | undefined = undefined;
      const updatedEntity = await this.tableAvailabilityService.update({
        id,
        payload,
      });
      if (updatedEntity) {
        response = this.mapper.map(
          updatedEntity,
          TableAvailabilityEntity,
          TableAvailabilityResponseDto,
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

  async remove(id: number): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
        payload: { id },
      });
      let response: TableAvailabilityResponseDto | undefined = undefined;
      const deletedEntity = await this.tableAvailabilityService.remove({ id });
      if (deletedEntity) {
        response = this.mapper.map(
          deletedEntity,
          TableAvailabilityEntity,
          TableAvailabilityResponseDto,
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
