import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Version,
  UseInterceptors,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ParamsInterceptor } from '@/common/interceptors/params.interceptor';
import { Property } from '@/common/decorators/property.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { LoggerService } from '@/logger/services/logger.service';
import { CustomersOperationService } from '../operation-services/customers.operation-service';
import { CustomersEntity } from '../entities/customers.entity';

// dtos
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';
import { BaseIdParamDto } from '@/common/dtos/base-id-param.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { CustomersBodyDto } from '../dtos/customers/customers-body.dto';
import { CustomersBodyUpdateDto } from '../dtos/customers/customers-body-update.dto';
import { CustomersResponseDto } from '../dtos/customers/customers-response.dto';
import { CustomersQueryParamsDto } from '../dtos/customers/customers-query-params.dto';

@ApiTags('customers')
@Controller('/customers-services/customers')
export class CustomersController {
  private className = CustomersController.name;

  constructor(
    private customersOperationService: CustomersOperationService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiOperation({ summary: 'create' })
  @Version('1')
  @Post()
  async create(
    @Body()
    payload: CustomersBodyDto,
  ): Promise<CustomersResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'createCostumer',
        payload,
      });
      const response = await this.customersOperationService.create(payload);
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'createCostumer',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'find one' })
  @Version('1')
  @UseInterceptors(ParamsInterceptor)
  @Get(':id')
  async findOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param() params: BaseIdParamDto,
    @Property()
    { entity }: BaseFindOnePropertyDto<CustomersEntity>,
  ): Promise<CustomersResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOneCostumer',
        payload: entity,
      });
      const response = await this.customersOperationService.findOne(entity);
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findOneCostumer',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'find all' })
  @ApiPaginatedResponse(CustomersResponseDto)
  @Version('1')
  @Get()
  async findAll(
    @Query() queryParams: CustomersQueryParamsDto,
  ): Promise<PaginationResponseDto<CustomersResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAllCostumer',
        payload: queryParams,
      });
      const response = await this.customersOperationService.findAll(
        queryParams,
      );
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findAllCostumer',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'update' })
  @Version('1')
  @Patch(':id')
  async update(
    @Param() { id }: BaseIdParamDto,
    @Body()
    payload: CustomersBodyUpdateDto,
  ): Promise<CustomersResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'updateCostumer',
        payload: { ...payload, id },
      });
      const response = await this.customersOperationService.update(id, payload);
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'updateCostumer',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'remove' })
  @Version('1')
  @Delete(':id')
  async remove(@Param() { id }: BaseIdParamDto): Promise<CustomersResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'removeCostumer',
        payload: { id },
      });
      const response = await this.customersOperationService.remove(id);
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'removeCostumer',
        payload: e,
      });
      throw e;
    }
  }
}
