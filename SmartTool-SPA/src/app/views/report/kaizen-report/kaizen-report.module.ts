import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KaizenReportRoutingModule } from './kaizen-report-routing.module';
import { KaizenListComponent } from './kaizen-list/kaizen-list.component';
import { KaizenDetailComponent } from './kaizen-detail/kaizen-detail.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    KaizenListComponent,
    KaizenDetailComponent,
    ModelDetailComponent,

  ],
  imports: [
    CommonModule,
    KaizenReportRoutingModule,
    AlertModule.forRoot(),
    NgxSpinnerModule,
    FormsModule,
    PaginationModule,
    ChartsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
  ]
})
export class KaizenReportModule { }
