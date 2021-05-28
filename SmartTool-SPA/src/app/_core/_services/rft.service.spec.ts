/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RftService } from './rft.service';

describe('Service: Rft', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RftService]
    });
  });

  it('should ...', inject([RftService], (service: RftService) => {
    expect(service).toBeTruthy();
  }));
});
