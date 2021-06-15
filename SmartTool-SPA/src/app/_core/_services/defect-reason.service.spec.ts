import { TestBed } from '@angular/core/testing';

import { DefectReasonService } from './defect-reason.service';

describe('DefectReasonService', () => {
  let service: DefectReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefectReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
