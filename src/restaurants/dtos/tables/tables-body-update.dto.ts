import { PartialType } from '@nestjs/swagger';

import { TablesBodyDto } from './tables-body.dto';

export class TablesBodyUpdateDto extends PartialType(TablesBodyDto) {
  constructor(params: TablesBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
