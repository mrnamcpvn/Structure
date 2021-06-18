import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOperationEditComponent } from './model-operation-edit.component';

describe('ModelOperationEditComponent', () => {
  let component: ModelOperationEditComponent;
  let fixture: ComponentFixture<ModelOperationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelOperationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOperationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
