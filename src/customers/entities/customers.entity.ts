import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';

@Entity('customers')
export class CustomersEntity extends BaseEntity {
  @AutoMap()
  @Column({ length: 50 })
  readonly name!: string;

  @AutoMap()
  @Column({ length: 20, type: 'varchar' })
  readonly phone!: string;

  @AutoMap()
  @Column({ name: 'total_people', type: 'integer' })
  readonly totalPeople!: number;

  @AutoMap()
  @Column({ length: 500, type: 'varchar' })
  readonly comments?: string;

  constructor(params: CustomersEntity) {
    const childParams: Omit<
      CustomersEntity,
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
