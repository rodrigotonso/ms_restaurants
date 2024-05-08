import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { RestaurantsService } from '../services/restaurants.service';
import { RestaurantsEntity } from '../entities/restaurants.entity';
import { LoggerService } from '@/logger/services/logger.service';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';

// dtos
import { RestaurantsBodyDto } from '../dtos/restaurants/restaurants-body.dto';
import { RestaurantsBodyUpdateDto } from '../dtos/restaurants/restaurants-body-update.dto';
import { RestaurantsResponseDto } from '../dtos/restaurants/restaurants-response.dto';
import { RestaurantsFilterOptionsDto } from '../dtos/restaurants/restaurants-filter-options.dto';
import { RestaurantsQueryParamsDto } from '../dtos/restaurants/restaurants-query-params.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

@Injectable()
export class RestaurantsOperationService {
  private className = RestaurantsOperationService.name;

  constructor(
    private restaurantsService: RestaurantsService,
    private loggerService: LoggerService,
    private typeOrmUtil: TypeOrmUtil,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(payload: RestaurantsBodyDto): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
        payload,
      });
      const createdEntity = await this.restaurantsService.create({ payload });
      const response = this.mapper.map(
        createdEntity,
        RestaurantsEntity,
        RestaurantsResponseDto,
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

  async findOne(entity: RestaurantsEntity): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
        payload: entity,
      });
      const response = this.mapper.map(
        entity,
        RestaurantsEntity,
        RestaurantsResponseDto,
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
    queryParams: RestaurantsQueryParamsDto,
  ): Promise<PaginationResponseDto<RestaurantsResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAll',
        payload: queryParams,
      });
      const { order, page, take, ...others } = queryParams;
      const paginationOptions = new PaginationOptionsDto({ order, page, take });
      const filterOptions = new RestaurantsFilterOptionsDto(others);
      const where =
        this.typeOrmUtil.buidWhereObject<RestaurantsFilterOptionsDto>(
          filterOptions,
        );
      const { data, meta } = await this.restaurantsService.findAll({
        paginationOptions,
        where,
      });
      const newData = data.map((restaurant) => {
        return this.mapper.map(
          restaurant,
          RestaurantsEntity,
          RestaurantsResponseDto,
        );
      });
      const response = new PaginationResponseDto<RestaurantsResponseDto>(
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
    payload: RestaurantsBodyUpdateDto,
  ): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
        payload: { ...payload, id },
      });
      let response: RestaurantsResponseDto | undefined = undefined;
      const updatedEntity = await this.restaurantsService.update({
        id,
        payload,
      });
      if (updatedEntity) {
        response = this.mapper.map(
          updatedEntity,
          RestaurantsEntity,
          RestaurantsResponseDto,
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

  async remove(id: number): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
        payload: { id },
      });
      let response: RestaurantsResponseDto | undefined = undefined;
      const deletedEntity = await this.restaurantsService.remove({ id });
      if (deletedEntity) {
        response = this.mapper.map(
          deletedEntity,
          RestaurantsEntity,
          RestaurantsResponseDto,
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
