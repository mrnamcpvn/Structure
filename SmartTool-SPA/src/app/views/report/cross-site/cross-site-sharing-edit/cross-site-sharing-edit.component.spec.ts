import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSiteSharingEditComponent } from './cross-site-sharing-edit.component';

describe('CrossSiteSharingEditComponent', () => {
  let component: CrossSiteSharingEditComponent;
  let fixture: ComponentFixture<CrossSiteSharingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossSiteSharingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSiteSharingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
