import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerService } from './services/logger.service';
import { WinstonLoggerService } from './services/winston-logger.service';
import loggerOptions from '@/common/config/logger.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loggerOptions],
    }),
  ],
  providers: [LoggerService, WinstonLoggerService],
  exports: [LoggerService, WinstonLoggerService],
})
export class LoggerModule {}
