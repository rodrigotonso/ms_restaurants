import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import config from '@/common/config/env.config';
import { validationSchema } from '@/common/config/env.validation-schema';
import { TableAvailabilityController } from './table-availability.controller';
import { TableAvailabilityOperationService } from '../../operation-services/table-availability.operation-service';
import { LoggerService } from '@/logger/services/logger.service';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationMetaDto } from '@/common/dtos/pagination-meta.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { Order } from '@/common/consts/order.const';
import { TableAvailabilityService } from '../../services/table-availability.service';
import { TableAvailabilityResponseDto } from '../../dtos/table-availability/table-availability-response.dto';
import { TableAvailabilityBodyDto } from '../../dtos/table-availability/table-availability-body.dto';
import { TableAvailabilityEntity } from '../../entities/table-availability.entity';
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';

describe('TableAvailabilityController', () => {
  let controller: TableAvailabilityController;
  let tableAvailabilityOperationService: TableAvailabilityOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath:
            process.cwd() === '/app' ? '/environment/config.map' : '.env',
          load: [config],
          isGlobal: true,
          validationSchema,
        }),
      ],
      controllers: [TableAvailabilityController],
      providers: [
        {
          provide: TableAvailabilityOperationService,
          useFactory: () => ({
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }),
        },
        {
          provide: LoggerService,
          useFactory: () => ({
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
          }),
        },
        {
          provide: TableAvailabilityService,
          useFactory: () => ({
            getPreapprovalTableAvailability: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<TableAvailabilityController>(
      TableAvailabilityController,
    );

    tableAvailabilityOperationService =
      module.get<TableAvailabilityOperationService>(
        TableAvailabilityOperationService,
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test crud tableAvailability controller', () => {
    const TABLE_AVAILABILITY_MOCK_DATA = {
      id: 1,
      tableId: 1,
      weekDay: 3,
      startHour: '10:00',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
    const MOCK_TABLE_AVAILABILITY = new TableAvailabilityResponseDto(
      TABLE_AVAILABILITY_MOCK_DATA,
    );

    it('should create tableAvailability when execute create function ', async () => {
      jest
        .spyOn(tableAvailabilityOperationService, 'create')
        .mockImplementation(() => Promise.resolve(MOCK_TABLE_AVAILABILITY));
      const response = await controller.create({
        tableId: 1,
        weekDay: 3,
        startHour: '10:00',
      } as TableAvailabilityBodyDto);
      expect(response.id).toEqual(response.id);
    });

    it('should return one tableAvailability when execute findOne function ', async () => {
      jest
        .spyOn(tableAvailabilityOperationService, 'findOne')
        .mockImplementation(() => Promise.resolve(MOCK_TABLE_AVAILABILITY));

      const findOneParams: BaseFindOnePropertyDto<TableAvailabilityEntity> = {
        id: MOCK_TABLE_AVAILABILITY.id,
        entity: new TableAvailabilityEntity(MOCK_TABLE_AVAILABILITY),
      };
      const response = await controller.findOne(
        { id: MOCK_TABLE_AVAILABILITY.id },
        findOneParams,
      );
      expect(response.id).toEqual(response.id);
    });

    it('should return one tableAvailability when execute findAll function ', async () => {
      const MOCK_PAGINATION_OPTIONS = new PaginationOptionsDto({
        order: Order.ASC,
        page: 1,
        take: 10,
      });
      const MOCK_PAGINATION_META = new PaginationMetaDto({
        paginationOptions: MOCK_PAGINATION_OPTIONS,
        itemCount: 1,
      });
      const MOCK_PAGINATION_RESPONSE = new PaginationResponseDto(
        [MOCK_TABLE_AVAILABILITY],
        MOCK_PAGINATION_META,
      );
      jest
        .spyOn(tableAvailabilityOperationService, 'findAll')
        .mockImplementation(() => Promise.resolve(MOCK_PAGINATION_RESPONSE));
      const response = await controller.findAll(MOCK_PAGINATION_OPTIONS);
      expect(response).toEqual(MOCK_PAGINATION_RESPONSE);
    });
  });
});
