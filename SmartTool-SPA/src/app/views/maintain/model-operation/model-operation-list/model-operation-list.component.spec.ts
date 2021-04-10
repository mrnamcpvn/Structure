/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelOperationListComponent } from './model-operation-list.component';

describe('ModelOperationListComponent', () => {
  let component: ModelOperationListComponent;
  let fixture: ComponentFixture<ModelOperationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOperationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
