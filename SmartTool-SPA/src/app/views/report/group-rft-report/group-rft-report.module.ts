import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GroupRftReportRoutingModule } from './group-rft-report-routing.module';
import { RftDetailComponent } from './rft-detail/rft-detail.component';
import { RftListComponent } from './rft-list/rft-list.component';

@NgModule({
  declarations: [
    RftListComponent,
    RftDetailComponent
  ],
  imports: [
    CommonModule,
    GroupRftReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    ChartsModule,
    HighchartsChartModule,
  ],
})
export class GroupRftReportModule {}
