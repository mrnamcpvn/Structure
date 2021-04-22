/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KaizenListComponent } from './kaizen-list.component';

describe('KaizenListComponent', () => {
  let component: KaizenListComponent;
  let fixture: ComponentFixture<KaizenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaizenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
