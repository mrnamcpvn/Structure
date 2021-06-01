import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighchartsChartModule } from "highcharts-angular";
import { ChartsModule } from "ng2-charts";
import { AlertModule } from "ngx-bootstrap/alert";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { KaizenDetailComponent } from "./kaizen-detail/kaizen-detail.component";
import { KaizenListComponent } from "./kaizen-list/kaizen-list.component";
import { KaizenReportRoutingModule } from "./kaizen-report-routing.module";
import { ModelDetailComponent } from "./model-detail/model-detail.component";

@NgModule({
  declarations: [
    KaizenDetailComponent,
    ModelDetailComponent,
    KaizenListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    KaizenReportRoutingModule,
    ChartsModule,
    HighchartsChartModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class KaizenReportModule {}
