/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DefectReasonListComponent } from './defect-reason-list.component';

describe('DefectReasonListComponent', () => {
  let component: DefectReasonListComponent;
  let fixture: ComponentFixture<DefectReasonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectReasonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
