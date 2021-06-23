import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaizenRftListComponent } from './kaizen-rft-list.component';

describe('KaizenRftListComponent', () => {
  let component: KaizenRftListComponent;
  let fixture: ComponentFixture<KaizenRftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaizenRftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaizenRftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
