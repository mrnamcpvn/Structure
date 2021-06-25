import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSiteSharingPdfComponent } from './cross-site-sharing-pdf.component';

describe('CrossSiteSharingPdfComponent', () => {
  let component: CrossSiteSharingPdfComponent;
  let fixture: ComponentFixture<CrossSiteSharingPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossSiteSharingPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSiteSharingPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
