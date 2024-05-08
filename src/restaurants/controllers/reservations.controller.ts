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
import { ReservationsOperationService } from '../operation-services/reservations.operation-service';
import { ReservationsEntity } from '../entities/reservations.entity';

// dtos
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';
import { BaseIdParamDto } from '@/common/dtos/base-id-param.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { ReservationsBodyDto } from '../dtos/reservations/reservations-body.dto';
import { ReservationsBodyUpdateDto } from '../dtos/reservations/reservations-body-update.dto';
import { ReservationsResponseDto } from '../dtos/reservations/reservations-response.dto';
import { ReservationsQueryParamsDto } from '../dtos/reservations/reservations-query-params.dto';

@ApiTags('reservations')
@Controller('/notification-services/reservations')
export class ReservationsController {
  private className = ReservationsController.name;

  constructor(
    private reservationsOperationService: ReservationsOperationService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiOperation({ summary: 'create' })
  @Version('1')
  @Post()
  async create(
    @Body()
    payload: ReservationsBodyDto,
  ): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'createCostumer',
        payload,
      });
      const response = await this.reservationsOperationService.create(payload);
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
    { entity }: BaseFindOnePropertyDto<ReservationsEntity>,
  ): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOneCostumer',
        payload: entity,
      });
      const response = await this.reservationsOperationService.findOne(entity);
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
  @ApiPaginatedResponse(ReservationsResponseDto)
  @Version('1')
  @Get()
  async findAll(
    @Query() queryParams: ReservationsQueryParamsDto,
  ): Promise<PaginationResponseDto<ReservationsResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAllCostumer',
        payload: queryParams,
      });
      const response = await this.reservationsOperationService.findAll(
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
    payload: ReservationsBodyUpdateDto,
  ): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'updateCostumer',
        payload: { ...payload, id },
      });
      const response = await this.reservationsOperationService.update(
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
  ): Promise<ReservationsResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'removeCostumer',
        payload: { id },
      });
      const response = await this.reservationsOperationService.remove(id);
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
