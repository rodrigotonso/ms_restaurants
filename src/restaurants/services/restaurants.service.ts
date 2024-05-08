import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseCrudService } from '@/common/services/base-crud.service';
import { RestaurantsEntity } from '../entities/restaurants.entity';
import { RestaurantsBodyDto } from '../dtos/restaurants/restaurants-body.dto';
import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class RestaurantsService extends BaseCrudService<
  RestaurantsEntity,
  RestaurantsBodyDto
> {
  private className = RestaurantsService.name;

  constructor(
    @InjectRepository(RestaurantsEntity)
    private restaurantsRepository: Repository<RestaurantsEntity>,
    private loggerService: LoggerService,
  ) {
    super(restaurantsRepository, loggerService);
  }
}
