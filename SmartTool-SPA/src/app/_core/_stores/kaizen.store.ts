import { OperationResult } from './../_models/operation-result';
import { Kaizen } from './../_models/kaizen';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Pagination } from '../_models/pagination';
import { Injectable } from '@angular/core';

export interface KaizenState extends EntityState<Kaizen, any> {
  pagination: Pagination;
}

export function createInitialState(): KaizenState {
  return {
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    } as Pagination
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'kaizenStore', idKey: '_id' })
export class KaizenStore extends EntityStore<KaizenState> {
  constructor() {
    super();
  }

  akitaPreAddEntity(
    newEntity: Kaizen
  ): Kaizen & { _id: string } {
    return {
      ...newEntity,
      _id: `${newEntity.factory_id}_${newEntity.model_no}_${newEntity.serial_no}`,
    };
  }
}
