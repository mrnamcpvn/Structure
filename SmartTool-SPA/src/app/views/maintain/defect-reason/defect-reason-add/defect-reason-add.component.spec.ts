import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectReasonAddComponent } from './defect-reason-add.component';

describe('DefectReasonAddComponent', () => {
  let component: DefectReasonAddComponent;
  let fixture: ComponentFixture<DefectReasonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectReasonAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
