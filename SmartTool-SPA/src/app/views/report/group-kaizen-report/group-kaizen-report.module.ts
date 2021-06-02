import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighchartsChartModule } from "highcharts-angular";
import { ChartsModule } from "ng2-charts";
import { AlertModule } from "ngx-bootstrap/alert";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { GroupKaizenReportRoutingModule } from "./group-kaizen-report-routing.module";
import { KaizenGroupDetailComponent } from "./kaizen-group-detail/kaizen-group-detail.component";
import { KaizenGroupListComponent } from "./kaizen-group-list/kaizen-group-list.component";
import { ModelDetailComponent } from "./model-detail/model-detail.component";

@NgModule({
  declarations: [
    KaizenGroupListComponent,
    KaizenGroupDetailComponent,
    ModelDetailComponent,
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
    GroupKaizenReportRoutingModule,
  ],
})
export class GroupKaizenReportModule {}
