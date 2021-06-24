import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupKaizenReportRoutingModule } from './group-kaizen-report-routing.module';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { KaizenGroupListComponent } from './kaizen-group-list/kaizen-group-list.component';
import { KaizenGroupDetailComponent } from './kaizen-group-detail/kaizen-group-detail.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ModelDetailComponent,
    KaizenGroupListComponent,
    KaizenGroupDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxSpinnerModule,
    ChartsModule,
    HighchartsChartModule,
    AlertModule.forRoot(),
    GroupKaizenReportRoutingModule
  ]
})
export class GroupKaizenReportModule { }
