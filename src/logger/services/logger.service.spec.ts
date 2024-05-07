import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger.service';
import loggerOptions from '@/common/config/logger.config';
import { WinstonLoggerService } from './winston-logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [loggerOptions],
        }),
      ],
      providers: [LoggerService, WinstonLoggerService],
    }).compile();
    service = await module.resolve<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
