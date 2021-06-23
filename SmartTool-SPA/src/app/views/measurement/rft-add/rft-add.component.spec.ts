import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RftAddComponent } from './rft-add.component';

describe('RftAddComponent', () => {
  let component: RftAddComponent;
  let fixture: ComponentFixture<RftAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RftAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RftAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
