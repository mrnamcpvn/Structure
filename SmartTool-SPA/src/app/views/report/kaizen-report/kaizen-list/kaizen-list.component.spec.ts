import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenListComponent } from './kaizen-list.component';

describe('KaizenListComponent', () => {
  let component: KaizenListComponent;
  let fixture: ComponentFixture<KaizenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
