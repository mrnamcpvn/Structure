import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSiteSharingPdfListComponent } from './cross-site-sharing-pdf-list.component';

describe('CrossSiteSharingPdfListComponent', () => {
  let component: CrossSiteSharingPdfListComponent;
  let fixture: ComponentFixture<CrossSiteSharingPdfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossSiteSharingPdfListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSiteSharingPdfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
