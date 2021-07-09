/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RftEditComponent } from './rft-edit.component';

describe('RftEditComponent', () => {
  let component: RftEditComponent;
  let fixture: ComponentFixture<RftEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RftEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
