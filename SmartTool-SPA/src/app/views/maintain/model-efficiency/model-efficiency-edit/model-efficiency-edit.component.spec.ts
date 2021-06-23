import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEfficiencyEditComponent } from './model-efficiency-edit.component';

describe('ModelEfficiencyEditComponent', () => {
  let component: ModelEfficiencyEditComponent;
  let fixture: ComponentFixture<ModelEfficiencyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelEfficiencyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEfficiencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
