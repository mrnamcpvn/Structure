import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectReasonEditComponent } from './defect-reason-edit.component';

describe('DefectReasonEditComponent', () => {
  let component: DefectReasonEditComponent;
  let fixture: ComponentFixture<DefectReasonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectReasonEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectReasonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
