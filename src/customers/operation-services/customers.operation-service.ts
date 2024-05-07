import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { CustomersService } from '../services/customers.service';
import { CustomersEntity } from '../entities/customers.entity';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';

// dtos
import { CustomersBodyDto } from '../dtos/customers/customers-body.dto';
import { CustomersBodyUpdateDto } from '../dtos/customers/customers-body-update.dto';
import { CustomersResponseDto } from '../dtos/customers/customers-response.dto';
import { CustomersFilterOptionsDto } from '../dtos/customers/customers-filter-options.dto';
import { CustomersQueryParamsDto } from '../dtos/customers/customers-query-params.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

@Injectable()
export class CustomersOperationService {
  private className = CustomersOperationService.name;

  constructor(
    private customersService: CustomersService,
    private typeOrmUtil: TypeOrmUtil,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(payload: CustomersBodyDto): Promise<CustomersResponseDto> {
    try {
      const createdEntity = await this.customersService.create({ payload });
      const response = this.mapper.map(
        createdEntity,
        CustomersEntity,
        CustomersResponseDto,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findOne(entity: CustomersEntity): Promise<CustomersResponseDto> {
    try {
      const response = this.mapper.map(
        entity,
        CustomersEntity,
        CustomersResponseDto,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findAll(
    queryParams: CustomersQueryParamsDto,
  ): Promise<PaginationResponseDto<CustomersResponseDto>> {
    try {
      const { order, page, take, ...others } = queryParams;
      const paginationOptions = new PaginationOptionsDto({ order, page, take });
      const filterOptions = new CustomersFilterOptionsDto(others);
      const where =
        this.typeOrmUtil.buidWhereObject<CustomersFilterOptionsDto>(
          filterOptions,
        );
      const { data, meta } = await this.customersService.findAll({
        paginationOptions,
        where,
      });
      const newData = data.map((customer) => {
        return this.mapper.map(customer, CustomersEntity, CustomersResponseDto);
      });
      const response = new PaginationResponseDto<CustomersResponseDto>(
        newData,
        meta,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: number,
    payload: CustomersBodyUpdateDto,
  ): Promise<CustomersResponseDto> {
    try {
      let response: CustomersResponseDto | undefined = undefined;
      const updatedEntity = await this.customersService.update({
        id,
        payload,
      });
      if (updatedEntity) {
        response = this.mapper.map(
          updatedEntity,
          CustomersEntity,
          CustomersResponseDto,
        );
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  async remove(id: number): Promise<CustomersResponseDto> {
    try {
      let response: CustomersResponseDto | undefined = undefined;
      const deletedEntity = await this.customersService.remove({ id });
      if (deletedEntity) {
        response = this.mapper.map(
          deletedEntity,
          CustomersEntity,
          CustomersResponseDto,
        );
      }
      return response;
    } catch (e) {
      throw e;
    }
  }
}
