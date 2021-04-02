import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ModelKaizenReport } from '../_models/model-kaizen-report';
import { Pagination } from '../_models/pagination';

export interface GroupKaizenReportState extends EntityState<ModelKaizenReport, number> {
  pagination: Pagination;
}

export function createInitialState(): GroupKaizenReportState {
  return {
    pagination: {} as Pagination,
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'groupKaizenReport', idKey: '_id' })
export class GroupKaizenReportStore extends EntityStore<GroupKaizenReportState> {
  constructor() {
    super(createInitialState());
  }

  akitaPreAddEntity(
    newEntity: ModelKaizenReport
  ): ModelKaizenReport & { _id: string } {
    return {
      ...newEntity,
      _id: `${newEntity.factory_id}_${newEntity.model_no}`,
    };
  }
}
