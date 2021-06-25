import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSiteSharingListComponent } from './cross-site-sharing-list.component';

describe('CrossSiteSharingListComponent', () => {
  let component: CrossSiteSharingListComponent;
  let fixture: ComponentFixture<CrossSiteSharingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossSiteSharingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSiteSharingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
