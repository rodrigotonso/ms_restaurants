import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';

@Entity('tables')
export class TablesEntity extends BaseEntity {
  @AutoMap()
  @Column({ name: 'restaurant_id', type: 'integer', default: null })
  readonly restaurantId!: number;

  @AutoMap()
  @Column({ name: 'friendly_name', length: 50, default: null })
  readonly friendlyName?: string;

  @AutoMap()
  @Column({ name: 'desired_people', type: 'integer', default: 0 })
  readonly desiredPeople?: number;

  @AutoMap()
  @Column({ name: 'min_people', type: 'integer', default: 0 })
  readonly minPeople?: number;

  @AutoMap()
  @Column({ name: 'max_people', type: 'integer' })
  readonly maxPeople!: number;

  constructor(params: TablesEntity) {
    const childParams: Omit<
      TablesEntity,
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
