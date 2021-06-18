import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOperationAddComponent } from './model-operation-add.component';

describe('ModelOperationAddComponent', () => {
  let component: ModelOperationAddComponent;
  let fixture: ComponentFixture<ModelOperationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelOperationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOperationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
