import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenEditComponent } from './kaizen-edit.component';

describe('KaizenEditComponent', () => {
  let component: KaizenEditComponent;
  let fixture: ComponentFixture<KaizenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
