import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { KaizenReportState, KaizenReportStore } from '../_stores/kaizen-report.store';

@Injectable({ providedIn: 'root' })
export class KaizenReportQuery extends QueryEntity<KaizenReportState> {
  constructor(protected store: KaizenReportStore) {
    super(store);
  }
}
