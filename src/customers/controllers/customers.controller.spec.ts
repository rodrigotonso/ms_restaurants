import { Test, TestingModule } from '@nestjs/testing';

import { CustomersController } from './customers.controller';
import { CustomersOperationService } from '../operation-services/customers.operation-service';
import { LoggerService } from '@/logger/services/logger.service';
import { CustomersService } from '../services/customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }),
        },
      ],
    }).compile();
    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
