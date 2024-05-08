import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import config from '@/common/config/env.config';
import { validationSchema } from '@/common/config/env.validation-schema';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsOperationService } from '../../operation-services/restaurants.operation-service';
import { LoggerService } from '@/logger/services/logger.service';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationMetaDto } from '@/common/dtos/pagination-meta.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { Order } from '@/common/consts/order.const';
import { RestaurantsService } from '../../services/restaurants.service';
import { RestaurantsResponseDto } from '../../dtos/restaurants/restaurants-response.dto';
import { RestaurantsBodyDto } from '../../dtos/restaurants/restaurants-body.dto';
import { RestaurantsEntity } from '../../entities/restaurants.entity';
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let restaurantsOperationService: RestaurantsOperationService;

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
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsOperationService,
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
          provide: RestaurantsService,
          useFactory: () => ({
            getPreapprovalRestaurants: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);

    restaurantsOperationService = module.get<RestaurantsOperationService>(
      RestaurantsOperationService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test crud restaurants controller', () => {
    const RESTAURANT_MOCK_DATA = {
      id: 1,
      name: 'Italian Food',
      location: 'Walker 1211',
      image:
        'https://img.freepik.com/free-photo/happy-waiter-serving-food-group-cheerful-friends-pub_637285-12525.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
    const MOCK_RESTAURANT = new RestaurantsResponseDto(RESTAURANT_MOCK_DATA);

    it('should create restaurants when execute create function ', async () => {
      jest
        .spyOn(restaurantsOperationService, 'create')
        .mockImplementation(() => Promise.resolve(MOCK_RESTAURANT));
      const response = await controller.create({
        name: 'Italian Food',
        location: 'Walker 1211',
        image:
          'https://img.freepik.com/free-photo/happy-waiter-serving-food-group-cheerful-friends-pub_637285-12525.jpg',
      } as RestaurantsBodyDto);
      expect(response.id).toEqual(response.id);
    });

    it('should return one restaurants when execute findOne function ', async () => {
      jest
        .spyOn(restaurantsOperationService, 'findOne')
        .mockImplementation(() => Promise.resolve(MOCK_RESTAURANT));

      const findOneParams: BaseFindOnePropertyDto<RestaurantsEntity> = {
        id: MOCK_RESTAURANT.id,
        entity: new RestaurantsEntity(MOCK_RESTAURANT),
      };
      const response = await controller.findOne(
        { id: MOCK_RESTAURANT.id },
        findOneParams,
      );
      expect(response.id).toEqual(response.id);
    });

    it('should return one restaurants when execute findAll function ', async () => {
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
        [MOCK_RESTAURANT],
        MOCK_PAGINATION_META,
      );
      jest
        .spyOn(restaurantsOperationService, 'findAll')
        .mockImplementation(() => Promise.resolve(MOCK_PAGINATION_RESPONSE));
      const response = await controller.findAll(MOCK_PAGINATION_OPTIONS);
      expect(response).toEqual(MOCK_PAGINATION_RESPONSE);
    });
  });
});
