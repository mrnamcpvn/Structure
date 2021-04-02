import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { EntityState } from '@datorama/akita';
import { Pagination } from '../_models/pagination';
import { RFTReport } from '../_models/rft-report';
import { RFTReportDetail } from '../_models/rft-report-detail';

export interface RFTReportState extends EntityState<RFTReport, number> {
  pagination: Pagination;
  rftReportDetail: RFTReportDetail;
}

export function createInitialState(): RFTReportState {
  return {
    pagination: {} as Pagination,
    rftReportDetail: {} as RFTReportDetail
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'rftReport', idKey: '_id' })
export class RFTReportStore extends EntityStore<RFTReportState> {
  constructor() {
    super(createInitialState());
  }

  akitaPreAddEntity(
    newEntity: RFTReport
  ): RFTReport & { _id: string } {
    return {
      ...newEntity,
      _id: `${newEntity.factory_id}_${newEntity.model_no}`,
    };
  }
}
