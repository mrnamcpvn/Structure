import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { KaizenReportModule } from './kaizen-report/kaizen-report.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportRoutingModule,
    KaizenReportModule,
  ]
})
export class ReportModule { }
