import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighchartsChartModule } from "highcharts-angular";
import { ChartsModule } from "ng2-charts";
import { AlertModule } from "ngx-bootstrap/alert";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { RftDetailComponent } from "./rft-detail/rft-detail.component";
import { RftListComponent } from "./rft-list/rft-list.component";
import { RftReportRoutingModule } from "./rft-report-routing.module";

@NgModule({
  declarations: [RftListComponent, RftDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    RftReportRoutingModule,
    ChartsModule,
    HighchartsChartModule,
  ],
})
export class RftReportModule {}
