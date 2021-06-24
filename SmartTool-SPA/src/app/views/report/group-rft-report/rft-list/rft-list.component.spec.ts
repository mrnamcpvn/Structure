import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RftListComponent } from './rft-list.component';

describe('RftListComponent', () => {
  let component: RftListComponent;
  let fixture: ComponentFixture<RftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
