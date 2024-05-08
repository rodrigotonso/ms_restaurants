import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseCrudService } from '@/common/services/base-crud.service';
import { ReservationsEntity } from '../entities/reservations.entity';
import { ReservationsBodyDto } from '../dtos/reservations/reservations-body.dto';
import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class ReservationsService extends BaseCrudService<
  ReservationsEntity,
  ReservationsBodyDto
> {
  private className = ReservationsService.name;

  constructor(
    @InjectRepository(ReservationsEntity)
    private reservationsRepository: Repository<ReservationsEntity>,
    private loggerService: LoggerService,
  ) {
    super(reservationsRepository, loggerService);
  }
}
