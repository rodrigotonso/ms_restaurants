import { Injectable } from '@nestjs/common';
import { Equal } from 'typeorm';

@Injectable()
export class TypeOrmUtil {
  buidWhereObject<T>(filterObject: { [key: string]: any }): T {
    try {
      for (const prop in filterObject) {
        if (filterObject[prop]) {
          filterObject[prop] = Equal(filterObject[prop]);
        }
      }
      return filterObject as T;
    } catch (e) {
      throw e;
    }
  }
}
