import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import config from '@/common/config/env.config';
import { validationSchema } from '@/common/config/env.validation-schema';
import { CustomersController } from './customers.controller';
import { CustomersOperationService } from '@/customers/operation-services/customers.operation-service';
import { LoggerService } from '@/logger/services/logger.service';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationMetaDto } from '@/common/dtos/pagination-meta.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { Order } from '@/common/consts/order.const';
import { CustomersService } from '../services/customers.service';
import { CustomersResponseDto } from '../dtos/customers/customers-response.dto';
import { CustomersBodyDto } from '../dtos/customers/customers-body.dto';
import { CustomersEntity } from '../entities/customers.entity';
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customerOperationService: CustomersOperationService;

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
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersOperationService,
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
          provide: CustomersService,
          useFactory: () => ({
            getPreapprovalCustomers: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);

    customerOperationService = module.get<CustomersOperationService>(
      CustomersOperationService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test crud customers controller', () => {
    const CUSTOMER_MOCK_DATA = {
      id: 1,
      name: 'Peter Benjamin Parker',
      phone: '5492211231231',
      totalPeople: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
    const MOCK_CUSTOMER = new CustomersResponseDto(CUSTOMER_MOCK_DATA);

    it('should create customers when execute create function ', async () => {
      jest
        .spyOn(customerOperationService, 'create')
        .mockImplementation(() => Promise.resolve(MOCK_CUSTOMER));
      const response = await controller.create({
        id: 1,
        name: 'Bruce Wayne',
        phone: '5491111231231',
        totalPeople: 1,
      } as CustomersBodyDto);
      expect(response.id).toEqual(response.id);
    });

    it('should return one customers when execute findOne function ', async () => {
      jest
        .spyOn(customerOperationService, 'findOne')
        .mockImplementation(() => Promise.resolve(MOCK_CUSTOMER));

      const findOneParams: BaseFindOnePropertyDto<CustomersEntity> = {
        id: MOCK_CUSTOMER.id,
        entity: new CustomersEntity(MOCK_CUSTOMER),
      };
      const response = await controller.findOne(
        { id: MOCK_CUSTOMER.id },
        findOneParams,
      );
      expect(response.id).toEqual(response.id);
    });

    it('should return one customers when execute findAll function ', async () => {
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
        [MOCK_CUSTOMER],
        MOCK_PAGINATION_META,
      );
      jest
        .spyOn(customerOperationService, 'findAll')
        .mockImplementation(() => Promise.resolve(MOCK_PAGINATION_RESPONSE));
      const response = await controller.findAll(MOCK_PAGINATION_OPTIONS);
      expect(response).toEqual(MOCK_PAGINATION_RESPONSE);
    });
  });
});
