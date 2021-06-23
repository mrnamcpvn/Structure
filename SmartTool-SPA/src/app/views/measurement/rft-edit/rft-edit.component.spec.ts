import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RftEditComponent } from './rft-edit.component';

describe('RftEditComponent', () => {
  let component: RftEditComponent;
  let fixture: ComponentFixture<RftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RftEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
