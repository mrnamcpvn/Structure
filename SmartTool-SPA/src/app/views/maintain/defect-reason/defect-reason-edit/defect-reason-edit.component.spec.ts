/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DefectReasonEditComponent } from './defect-reason-edit.component';

describe('DefectReasonEditComponent', () => {
  let component: DefectReasonEditComponent;
  let fixture: ComponentFixture<DefectReasonEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectReasonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectReasonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
