import { Entity, Column, Index } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';

@Entity('restaurants')
export class RestaurantsEntity extends BaseEntity {
  @AutoMap()
  @Index('idx_name', { unique: true })
  @Column({ length: 50 })
  readonly name!: string;

  @AutoMap()
  @Column({ length: 150, default: null, type: 'varchar' })
  readonly location?: string;

  @AutoMap()
  @Column({ length: 300 })
  readonly image!: string;

  constructor(params: RestaurantsEntity) {
    const childParams: Omit<
      RestaurantsEntity,
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
