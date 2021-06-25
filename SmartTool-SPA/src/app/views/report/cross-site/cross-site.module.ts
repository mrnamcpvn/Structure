import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossSiteRoutingModule } from './cross-site-routing.module';
import { CrossSiteSharingPdfListComponent } from './cross-site-sharing-pdf-list/cross-site-sharing-pdf-list.component';
import { CrossSiteSharingPdfComponent } from './cross-site-sharing-pdf/cross-site-sharing-pdf.component';
import { CrossSiteSharingListComponent } from './cross-site-sharing-list/cross-site-sharing-list.component';
import { CrossSiteSharingEditComponent } from './cross-site-sharing-edit/cross-site-sharing-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    CrossSiteSharingPdfListComponent,
    CrossSiteSharingPdfComponent,
    CrossSiteSharingListComponent,
    CrossSiteSharingEditComponent
  ],
  imports: [
    CommonModule,
    CrossSiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    PaginationModule,
    ChartsModule,
    HighchartsChartModule,
    NgxPrintModule,

  ]
})
export class CrossSiteModule { }
