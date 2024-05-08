import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import config from '@/common/config/env.config';
import { validationSchema } from '@/common/config/env.validation-schema';
import { TablesController } from './tables.controller';
import { TablesOperationService } from '../../operation-services/tables.operation-service';
import { LoggerService } from '@/logger/services/logger.service';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationMetaDto } from '@/common/dtos/pagination-meta.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { Order } from '@/common/consts/order.const';
import { TablesService } from '../../services/tables.service';
import { TablesResponseDto } from '../../dtos/tables/tables-response.dto';
import { TablesBodyDto } from '../../dtos/tables/tables-body.dto';
import { TablesEntity } from '../../entities/tables.entity';
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';

describe('TablesController', () => {
  let controller: TablesController;
  let tablesOperationService: TablesOperationService;

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
      controllers: [TablesController],
      providers: [
        {
          provide: TablesOperationService,
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
          provide: TablesService,
          useFactory: () => ({
            TetPreapprovaltables: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<TablesController>(TablesController);

    tablesOperationService = module.get<TablesOperationService>(
      TablesOperationService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test crud tables controller', () => {
    const TABLE_MOCK_DATA = {
      id: 1,
      restaurantId: 1,
      friendlyName: 'InDoorTable401',
      desiredPeople: 6,
      minPeople: 4,
      maxPeople: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
    const MOCK_TABLE = new TablesResponseDto(TABLE_MOCK_DATA);

    it('should create tables when execute create function ', async () => {
      jest
        .spyOn(tablesOperationService, 'create')
        .mockImplementation(() => Promise.resolve(MOCK_TABLE));
      const response = await controller.create({
        restaurantId: 1,
        friendlyName: 'InDoorTable401',
        desiredPeople: 2,
        minPeople: 2,
        maxPeople: 2,
      } as TablesBodyDto);
      expect(response.id).toEqual(response.id);
    });

    it('should return one tables when execute findOne function ', async () => {
      jest
        .spyOn(tablesOperationService, 'findOne')
        .mockImplementation(() => Promise.resolve(MOCK_TABLE));

      const findOneParams: BaseFindOnePropertyDto<TablesEntity> = {
        id: MOCK_TABLE.id,
        entity: new TablesEntity(MOCK_TABLE),
      };
      const response = await controller.findOne(
        { id: MOCK_TABLE.id },
        findOneParams,
      );
      expect(response.id).toEqual(response.id);
    });

    it('should return one tables when execute findAll function ', async () => {
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
        [MOCK_TABLE],
        MOCK_PAGINATION_META,
      );
      jest
        .spyOn(tablesOperationService, 'findAll')
        .mockImplementation(() => Promise.resolve(MOCK_PAGINATION_RESPONSE));
      const response = await controller.findAll(MOCK_PAGINATION_OPTIONS);
      expect(response).toEqual(MOCK_PAGINATION_RESPONSE);
    });
  });
});
