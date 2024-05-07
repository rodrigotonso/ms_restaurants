import { PartialType } from '@nestjs/swagger';

import { CustomersBodyDto } from './customers-body.dto';

export class CustomersBodyUpdateDto extends PartialType(CustomersBodyDto) {
  constructor(params: CustomersBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
