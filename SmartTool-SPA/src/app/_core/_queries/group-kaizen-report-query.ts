import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GroupKaizenReportState, GroupKaizenReportStore } from '../_stores/group-kaizen-report.store';

@Injectable({ providedIn: 'root' })
export class GroupKaizenReportQuery extends QueryEntity<GroupKaizenReportState> {
  constructor(protected store: GroupKaizenReportStore) {
    super(store);
  }
}
