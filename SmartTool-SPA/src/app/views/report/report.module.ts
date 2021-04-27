import { NgModule } from "@angular/core";
import { GroupKaizenReportModule } from "./group-kaizen-report/group-kaizen-report.module";
import { KaizenReportModule } from "./kaizen-report/kaizen-report.module";
import { ReportRoutingModule } from "./report-routing.module";
@NgModule({
    declarations: [],
    imports: [
      KaizenReportModule,
      ReportRoutingModule,
      GroupKaizenReportModule
    ],
  })


export class ReportModule {}
