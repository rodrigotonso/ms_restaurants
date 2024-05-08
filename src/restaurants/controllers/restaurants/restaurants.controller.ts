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
import { RestaurantsOperationService } from '../../operation-services/restaurants.operation-service';
import { RestaurantsEntity } from '../../entities/restaurants.entity';

// dtos
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';
import { BaseIdParamDto } from '@/common/dtos/base-id-param.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { RestaurantsBodyDto } from '../../dtos/restaurants/restaurants-body.dto';
import { RestaurantsBodyUpdateDto } from '../../dtos/restaurants/restaurants-body-update.dto';
import { RestaurantsResponseDto } from '../../dtos/restaurants/restaurants-response.dto';
import { RestaurantsQueryParamsDto } from '../../dtos/restaurants/restaurants-query-params.dto';

@ApiTags('restaurants')
@Controller('/notification-services/restaurants')
export class RestaurantsController {
  private className = RestaurantsController.name;

  constructor(
    private restaurantsOperationService: RestaurantsOperationService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiOperation({ summary: 'create' })
  @Version('1')
  @Post()
  async create(
    @Body()
    payload: RestaurantsBodyDto,
  ): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'createCostumer',
        payload,
      });
      const response = await this.restaurantsOperationService.create(payload);
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
    { entity }: BaseFindOnePropertyDto<RestaurantsEntity>,
  ): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOneCostumer',
        payload: entity,
      });
      const response = await this.restaurantsOperationService.findOne(entity);
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
  @ApiPaginatedResponse(RestaurantsResponseDto)
  @Version('1')
  @Get()
  async findAll(
    @Query() queryParams: RestaurantsQueryParamsDto,
  ): Promise<PaginationResponseDto<RestaurantsResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAllCostumer',
        payload: queryParams,
      });
      const response = await this.restaurantsOperationService.findAll(
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
    payload: RestaurantsBodyUpdateDto,
  ): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'updateCostumer',
        payload: { ...payload, id },
      });
      const response = await this.restaurantsOperationService.update(
        id,
        payload,
      );
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
  async remove(
    @Param() { id }: BaseIdParamDto,
  ): Promise<RestaurantsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'removeCostumer',
        payload: { id },
      });
      const response = await this.restaurantsOperationService.remove(id);
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
