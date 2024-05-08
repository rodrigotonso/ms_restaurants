import { PartialType } from '@nestjs/swagger';

import { RestaurantsBodyDto } from './restaurants-body.dto';

export class RestaurantsBodyUpdateDto extends PartialType(RestaurantsBodyDto) {
  constructor(params: RestaurantsBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
