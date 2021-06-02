import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RftDetailComponent } from './rft-detail.component';

describe('RftDetailComponent', () => {
  let component: RftDetailComponent;
  let fixture: ComponentFixture<RftDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RftDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RftDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
