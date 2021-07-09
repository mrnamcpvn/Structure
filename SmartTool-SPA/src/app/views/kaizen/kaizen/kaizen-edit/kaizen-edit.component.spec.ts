/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KaizenEditComponent } from './kaizen-edit.component';

describe('KaizenEditComponent', () => {
  let component: KaizenEditComponent;
  let fixture: ComponentFixture<KaizenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaizenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
