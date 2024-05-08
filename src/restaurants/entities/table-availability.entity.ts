import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';

@Entity('table_availability')
export class TableAvailabilityEntity extends BaseEntity {
  @AutoMap()
  @Column({ name: 'table_id', type: 'integer' })
  readonly tableId!: number;

  @AutoMap()
  @Column({ name: 'week_day', type: 'integer', default: 0 })
  readonly weekDay!: number;

  @AutoMap()
  @Column({ name: 'start_hour', type: 'time' })
  readonly startHour!: string;

  constructor(params: TableAvailabilityEntity) {
    const childParams: Omit<
      TableAvailabilityEntity,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    > = {
      ...params,
    };
    super({
      id: params?.id,
      createdAt: params?.createdAt,
      updatedAt: params?.updatedAt,
      deletedAt: params?.deletedAt,
    });
    Object.assign(this, childParams);
  }
}
