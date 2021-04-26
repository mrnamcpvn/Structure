import { NgModule } from "@angular/core";
import { KaizenReportModule } from "./kaizen-report/kaizen-report.module";
import { ReportRoutingModule } from "./report-routing.module";
@NgModule({
    declarations: [],
    imports: [
      KaizenReportModule,
      ReportRoutingModule
    ],
  })


export class ReportModule {}
