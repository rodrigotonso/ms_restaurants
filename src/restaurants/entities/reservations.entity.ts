import { Entity, Column, Index } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';

@Entity('reservations')
@Index('idx_key_table_date', ['tableId', 'date'])
export class ReservationsEntity extends BaseEntity {
  @AutoMap()
  @Column({ name: 'table_id', type: 'integer' })
  readonly tableId!: number;

  @AutoMap()
  @Column({ name: 'customer_id', type: 'integer' })
  readonly customerId!: number;

  @AutoMap()
  @Column({ type: 'date' })
  readonly date?: Date;

  constructor(params: ReservationsEntity) {
    const childParams: Omit<
      ReservationsEntity,
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
