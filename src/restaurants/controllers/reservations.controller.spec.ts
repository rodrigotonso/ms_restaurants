import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import config from '@/common/config/env.config';
import { validationSchema } from '@/common/config/env.validation-schema';
import { ReservationsController } from './reservations.controller';
import { ReservationsOperationService } from '../operation-services/reservations.operation-service';
import { LoggerService } from '@/logger/services/logger.service';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationMetaDto } from '@/common/dtos/pagination-meta.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { Order } from '@/common/consts/order.const';
import { ReservationsService } from '../services/reservations.service';
import { ReservationsResponseDto } from '../dtos/reservations/reservations-response.dto';
import { ReservationsBodyDto } from '../dtos/reservations/reservations-body.dto';
import { ReservationsEntity } from '../entities/reservations.entity';
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let reservationsOperationService: ReservationsOperationService;

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
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsOperationService,
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
          provide: ReservationsService,
          useFactory: () => ({
            getPreapprovalReservations: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);

    reservationsOperationService = module.get<ReservationsOperationService>(
      ReservationsOperationService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test crud reservations controller', () => {
    const RESERVATION_MOCK_DATA = {
      id: 1,
      tableId: 1,
      customerId: 1,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
    const MOCK_RESERVATION = new ReservationsResponseDto(RESERVATION_MOCK_DATA);

    it('should create reservations when execute create function ', async () => {
      jest
        .spyOn(reservationsOperationService, 'create')
        .mockImplementation(() => Promise.resolve(MOCK_RESERVATION));
      const response = await controller.create({
        tableId: 1,
        customerId: 1,
        date: new Date(),
      } as ReservationsBodyDto);
      expect(response.id).toEqual(response.id);
    });

    it('should return one reservations when execute findOne function ', async () => {
      jest
        .spyOn(reservationsOperationService, 'findOne')
        .mockImplementation(() => Promise.resolve(MOCK_RESERVATION));

      const findOneParams: BaseFindOnePropertyDto<ReservationsEntity> = {
        id: MOCK_RESERVATION.id,
        entity: new ReservationsEntity(MOCK_RESERVATION),
      };
      const response = await controller.findOne(
        { id: MOCK_RESERVATION.id },
        findOneParams,
      );
      expect(response.id).toEqual(response.id);
    });

    it('should return one reservations when execute findAll function ', async () => {
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
        [MOCK_RESERVATION],
        MOCK_PAGINATION_META,
      );
      jest
        .spyOn(reservationsOperationService, 'findAll')
        .mockImplementation(() => Promise.resolve(MOCK_PAGINATION_RESPONSE));
      const response = await controller.findAll(MOCK_PAGINATION_OPTIONS);
      expect(response).toEqual(MOCK_PAGINATION_RESPONSE);
    });
  });
});
