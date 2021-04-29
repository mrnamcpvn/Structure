/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RftListComponent } from './rft-list.component';

describe('RftListComponent', () => {
  let component: RftListComponent;
  let fixture: ComponentFixture<RftListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RftListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
