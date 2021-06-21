import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenDetailComponent } from './kaizen-detail.component';

describe('KaizenDetailComponent', () => {
  let component: KaizenDetailComponent;
  let fixture: ComponentFixture<KaizenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
