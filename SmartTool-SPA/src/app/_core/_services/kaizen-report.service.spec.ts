import { TestBed } from '@angular/core/testing';

import { KaizenReportService } from './kaizen-report.service';

describe('KaizenReportService', () => {
  let service: KaizenReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaizenReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
