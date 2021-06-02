import { NgModule } from "@angular/core";
import { CrossModule } from "./cross-site-sharing/cross.module";
import { GroupKaizenReportModule } from "./group-kaizen-report/group-kaizen-report.module";
import { GroupRftReportModule } from "./group-rft-report/group-rft-report.module";
import { KaizenReportModule } from "./kaizen-report/kaizen-report.module";
import { ReportRoutingModule } from "./report-routing.module";
import { RftReportModule } from "./rft-report/rft-report.module";

@NgModule({
  declarations: [],
  imports: [
    CrossModule,
    GroupRftReportModule,
    RftReportModule,
    KaizenReportModule,
    ReportRoutingModule,
    GroupKaizenReportModule,
  ],
})
export class ReportModule {}
