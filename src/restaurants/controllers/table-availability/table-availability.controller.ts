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
import { TableAvailabilityOperationService } from '../../operation-services/table-availability.operation-service';
import { TableAvailabilityEntity } from '../../entities/table-availability.entity';

// dtos
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';
import { BaseIdParamDto } from '@/common/dtos/base-id-param.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { TableAvailabilityBodyDto } from '../../dtos/table-availability/table-availability-body.dto';
import { TableAvailabilityBodyUpdateDto } from '../../dtos/table-availability/table-availability-body-update.dto';
import { TableAvailabilityResponseDto } from '../../dtos/table-availability/table-availability-response.dto';
import { TableAvailabilityQueryParamsDto } from '../../dtos/table-availability/table-availability-query-params.dto';

@ApiTags('tableAvailability')
@Controller('/availability-services/tableAvailability')
export class TableAvailabilityController {
  private className = TableAvailabilityController.name;

  constructor(
    private tableAvailabilityOperationService: TableAvailabilityOperationService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiOperation({ summary: 'create' })
  @Version('1')
  @Post()
  async create(
    @Body()
    payload: TableAvailabilityBodyDto,
  ): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'createTableAvailability',
        payload,
      });
      const response = await this.tableAvailabilityOperationService.create(
        payload,
      );
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'createTableAvailability',
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
    { entity }: BaseFindOnePropertyDto<TableAvailabilityEntity>,
  ): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOneTableAvailability',
        payload: entity,
      });
      const response = await this.tableAvailabilityOperationService.findOne(
        entity,
      );
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findOneTableAvailability',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'find all' })
  @ApiPaginatedResponse(TableAvailabilityResponseDto)
  @Version('1')
  @Get()
  async findAll(
    @Query() queryParams: TableAvailabilityQueryParamsDto,
  ): Promise<PaginationResponseDto<TableAvailabilityResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAllTableAvailability',
        payload: queryParams,
      });
      const response = await this.tableAvailabilityOperationService.findAll(
        queryParams,
      );
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findAllTableAvailability',
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
    payload: TableAvailabilityBodyUpdateDto,
  ): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'updateTableAvailability',
        payload: { ...payload, id },
      });
      const response = await this.tableAvailabilityOperationService.update(
        id,
        payload,
      );
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'updateTableAvailability',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'remove' })
  @Version('1')
  @Delete(':id')
  async remove(
    @Param() { id }: BaseIdParamDto,
  ): Promise<TableAvailabilityResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'removeTableAvailability',
        payload: { id },
      });
      const response = await this.tableAvailabilityOperationService.remove(id);
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'removeTableAvailability',
        payload: e,
      });
      throw e;
    }
  }
}
