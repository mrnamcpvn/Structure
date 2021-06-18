import { TestBed } from '@angular/core/testing';

import { ModelOperationService } from './model-operation.service';

describe('ModelOperationService', () => {
  let service: ModelOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
