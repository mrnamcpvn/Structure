/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefectReasonService } from './defect-reason.service';

describe('Service: DefectReason', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefectReasonService]
    });
  });

  it('should ...', inject([DefectReasonService], (service: DefectReasonService) => {
    expect(service).toBeTruthy();
  }));
});
