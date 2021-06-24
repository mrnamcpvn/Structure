import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenGroupDetailComponent } from './kaizen-group-detail.component';

describe('KaizenGroupDetailComponent', () => {
  let component: KaizenGroupDetailComponent;
  let fixture: ComponentFixture<KaizenGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenGroupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
