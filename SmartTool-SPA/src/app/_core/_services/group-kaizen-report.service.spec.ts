import { TestBed } from '@angular/core/testing';

import { GroupKaizenReportService } from './group-kaizen-report.service';

describe('GroupKaizenReportService', () => {
  let service: GroupKaizenReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupKaizenReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
