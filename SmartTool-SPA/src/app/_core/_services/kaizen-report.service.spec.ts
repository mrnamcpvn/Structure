/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KaizenReportService } from './kaizen-report.service';

describe('Service: KaizenReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KaizenReportService]
    });
  });

  it('should ...', inject([KaizenReportService], (service: KaizenReportService) => {
    expect(service).toBeTruthy();
  }));
});
