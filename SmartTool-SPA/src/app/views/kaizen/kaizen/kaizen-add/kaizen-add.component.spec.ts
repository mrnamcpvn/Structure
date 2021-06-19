import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenAddComponent } from './kaizen-add.component';

describe('KaizenAddComponent', () => {
  let component: KaizenAddComponent;
  let fixture: ComponentFixture<KaizenAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
