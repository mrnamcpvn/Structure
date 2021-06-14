import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectReasonListComponent } from './defect-reason-list.component';

describe('DefectReasonListComponent', () => {
  let component: DefectReasonListComponent;
  let fixture: ComponentFixture<DefectReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectReasonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
