/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RftAddComponent } from './rft-add.component';

describe('RftAddComponent', () => {
  let component: RftAddComponent;
  let fixture: ComponentFixture<RftAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RftAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RftAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
