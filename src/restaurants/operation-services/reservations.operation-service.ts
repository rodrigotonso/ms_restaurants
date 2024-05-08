import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { ReservationsService } from '../services/reservations.service';
import { ReservationsEntity } from '../entities/reservations.entity';
import { LoggerService } from '@/logger/services/logger.service';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';

// dtos
import { ReservationsBodyDto } from '../dtos/reservations/reservations-body.dto';
import { ReservationsBodyUpdateDto } from '../dtos/reservations/reservations-body-update.dto';
import { ReservationsResponseDto } from '../dtos/reservations/reservations-response.dto';
import { ReservationsFilterOptionsDto } from '../dtos/reservations/reservations-filter-options.dto';
import { ReservationsQueryParamsDto } from '../dtos/reservations/reservations-query-params.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

@Injectable()
export class ReservationsOperationService {
  private className = ReservationsOperationService.name;

  constructor(
    private reservationsService: ReservationsService,
    private loggerService: LoggerService,
    private typeOrmUtil: TypeOrmUtil,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(payload: ReservationsBodyDto): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
        payload,
      });
      const createdEntity = await this.reservationsService.create({ payload });
      const response = this.mapper.map(
        createdEntity,
        ReservationsEntity,
        ReservationsResponseDto,
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

  async findOne(entity: ReservationsEntity): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
        payload: entity,
      });
      const response = this.mapper.map(
        entity,
        ReservationsEntity,
        ReservationsResponseDto,
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
    queryParams: ReservationsQueryParamsDto,
  ): Promise<PaginationResponseDto<ReservationsResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAll',
        payload: queryParams,
      });
      const { order, page, take, ...others } = queryParams;
      const paginationOptions = new PaginationOptionsDto({ order, page, take });
      const filterOptions = new ReservationsFilterOptionsDto(others);
      const where =
        this.typeOrmUtil.buidWhereObject<ReservationsFilterOptionsDto>(
          filterOptions,
        );
      const { data, meta } = await this.reservationsService.findAll({
        paginationOptions,
        where,
      });
      const newData = data.map((reservation) => {
        return this.mapper.map(
          reservation,
          ReservationsEntity,
          ReservationsResponseDto,
        );
      });
      const response = new PaginationResponseDto<ReservationsResponseDto>(
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
    payload: ReservationsBodyUpdateDto,
  ): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
        payload: { ...payload, id },
      });
      let response: ReservationsResponseDto | undefined = undefined;
      const updatedEntity = await this.reservationsService.update({
        id,
        payload,
      });
      if (updatedEntity) {
        response = this.mapper.map(
          updatedEntity,
          ReservationsEntity,
          ReservationsResponseDto,
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

  async remove(id: number): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
        payload: { id },
      });
      let response: ReservationsResponseDto | undefined = undefined;
      const deletedEntity = await this.reservationsService.remove({ id });
      if (deletedEntity) {
        response = this.mapper.map(
          deletedEntity,
          ReservationsEntity,
          ReservationsResponseDto,
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
