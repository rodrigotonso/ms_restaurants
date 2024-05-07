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
@Controller('/notification-services/customers')
export class CustomersController {
  constructor(private customersOperationService: CustomersOperationService) {}

  @ApiOperation({ summary: 'create' })
  @Version('1')
  @Post()
  async create(
    @Body()
    payload: CustomersBodyDto,
  ): Promise<CustomersResponseDto> {
    try {
      const response = await this.customersOperationService.create(payload);
      return response;
    } catch (e) {
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
      const response = await this.customersOperationService.findOne(entity);
      return response;
    } catch (e) {
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
      const response = await this.customersOperationService.findAll(
        queryParams,
      );
      return response;
    } catch (e) {
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
      const response = await this.customersOperationService.update(id, payload);
      return response;
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({ summary: 'remove' })
  @Version('1')
  @Delete(':id')
  async remove(@Param() { id }: BaseIdParamDto): Promise<CustomersResponseDto> {
    try {
      const response = await this.customersOperationService.remove(id);
      return response;
    } catch (e) {
      throw e;
    }
  }
}
