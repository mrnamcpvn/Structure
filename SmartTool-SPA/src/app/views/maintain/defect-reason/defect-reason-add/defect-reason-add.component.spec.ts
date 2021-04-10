/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DefectReasonAddComponent } from './defect-reason-add.component';

describe('DefectReasonAddComponent', () => {
  let component: DefectReasonAddComponent;
  let fixture: ComponentFixture<DefectReasonAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectReasonAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
