import { TestBed } from '@angular/core/testing';

import { ModelEfficiencyService } from './model-efficiency.service';

describe('ModelEfficiencyService', () => {
  let service: ModelEfficiencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelEfficiencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
