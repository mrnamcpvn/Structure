import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ModelOperation } from '../_models/model-operation';
import { Pagination } from '../_models/pagination';

export interface ModelOperationState extends EntityState<ModelOperation, any> {
  pagination: Pagination;
  item: ModelOperation;
}

export function createInitialState(): ModelOperationState {
  return {
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    } as Pagination,
    item: {} as ModelOperation,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'modelOperationStore', idKey: '_id' })
export class ModelOperationStore extends EntityStore<ModelOperationState> {
  constructor() {
    super();
  }

  akitaPreAddEntity(
    newEntity: ModelOperation
  ): ModelOperation & { _id: string } {
    return {
      ...newEntity,
      _id: `${newEntity.factory_id}_${newEntity.model_no}_${newEntity.stage_id}_${newEntity.operation_id}`,
    };
  }
}
