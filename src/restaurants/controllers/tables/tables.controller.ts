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
import { TablesOperationService } from '../../operation-services/tables.operation-service';
import { TablesEntity } from '../../entities/tables.entity';

// dtos
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';
import { BaseIdParamDto } from '@/common/dtos/base-id-param.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { TablesBodyDto } from '../../dtos/tables/tables-body.dto';
import { TablesBodyUpdateDto } from '../../dtos/tables/tables-body-update.dto';
import { TablesResponseDto } from '../../dtos/tables/tables-response.dto';
import { TablesQueryParamsDto } from '../../dtos/tables/tables-query-params.dto';

@ApiTags('tables')
@Controller('/notification-services/tables')
export class TablesController {
  private className = TablesController.name;

  constructor(
    private tablesOperationService: TablesOperationService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiOperation({ summary: 'create' })
  @Version('1')
  @Post()
  async create(
    @Body()
    payload: TablesBodyDto,
  ): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'createCostumer',
        payload,
      });
      const response = await this.tablesOperationService.create(payload);
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
    { entity }: BaseFindOnePropertyDto<TablesEntity>,
  ): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOneCostumer',
        payload: entity,
      });
      const response = await this.tablesOperationService.findOne(entity);
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
  @ApiPaginatedResponse(TablesResponseDto)
  @Version('1')
  @Get()
  async findAll(
    @Query() queryParams: TablesQueryParamsDto,
  ): Promise<PaginationResponseDto<TablesResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAllCostumer',
        payload: queryParams,
      });
      const response = await this.tablesOperationService.findAll(queryParams);
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
    payload: TablesBodyUpdateDto,
  ): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'updateCostumer',
        payload: { ...payload, id },
      });
      const response = await this.tablesOperationService.update(id, payload);
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
  async remove(@Param() { id }: BaseIdParamDto): Promise<TablesResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'removeCostumer',
        payload: { id },
      });
      const response = await this.tablesOperationService.remove(id);
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
