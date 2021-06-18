import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOperationListComponent } from './model-operation-list.component';

describe('ModelOperationListComponent', () => {
  let component: ModelOperationListComponent;
  let fixture: ComponentFixture<ModelOperationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelOperationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
