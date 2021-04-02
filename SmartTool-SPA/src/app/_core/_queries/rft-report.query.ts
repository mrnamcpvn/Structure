import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RFTReportState, RFTReportStore } from '../_stores/rft-report.store';

@Injectable({ providedIn: 'root' })
export class RFTReportQuery extends QueryEntity<RFTReportState> {
  constructor(protected store: RFTReportStore) {
    super(store);
  }
}
