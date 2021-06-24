import { TestBed } from '@angular/core/testing';

import { RftReportService } from './rft-report.service';

describe('RftReportService', () => {
  let service: RftReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RftReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
