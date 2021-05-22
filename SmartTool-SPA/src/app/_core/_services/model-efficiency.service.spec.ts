/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModelEfficiencyService } from './model-efficiency.service';

describe('Service: ModelEfficiency', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelEfficiencyService]
    });
  });

  it('should ...', inject([ModelEfficiencyService], (service: ModelEfficiencyService) => {
    expect(service).toBeTruthy();
  }));
});
