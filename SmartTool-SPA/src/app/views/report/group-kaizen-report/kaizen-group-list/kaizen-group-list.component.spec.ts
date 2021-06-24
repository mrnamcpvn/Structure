import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenGroupListComponent } from './kaizen-group-list.component';

describe('KaizenGroupListComponent', () => {
  let component: KaizenGroupListComponent;
  let fixture: ComponentFixture<KaizenGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
