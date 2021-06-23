import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenRftEditComponent } from './kaizen-rft-edit.component';

describe('KaizenRftEditComponent', () => {
  let component: KaizenRftEditComponent;
  let fixture: ComponentFixture<KaizenRftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenRftEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenRftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
