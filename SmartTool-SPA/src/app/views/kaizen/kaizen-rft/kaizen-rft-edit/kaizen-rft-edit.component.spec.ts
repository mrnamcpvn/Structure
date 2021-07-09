/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KaizenRftEditComponent } from './kaizen-rft-edit.component';

describe('KaizenRftEditComponent', () => {
  let component: KaizenRftEditComponent;
  let fixture: ComponentFixture<KaizenRftEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaizenRftEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenRftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
