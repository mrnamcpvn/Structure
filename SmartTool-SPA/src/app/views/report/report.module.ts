import { NgModule } from "@angular/core";
import { CrossSiteSharingModule } from "./cross-site-sharing/cross-site-sharing.module";
import { GroupKaizenReportModule } from "./group-kaizen-report/group-kaizen-report.module";
import { GroupRftReportModule } from "./group-rft-report/group-rft-report.module";
import { KaizenReportModule } from "./kaizen-report/kaizen-report.module";
import { ReportRoutingModule } from "./report-routing.module";
import { RftReportModule } from "./rft-report/rft-report.module";

@NgModule({
  declarations: [],
  imports: [
    CrossSiteSharingModule,
    GroupKaizenReportModule,
    GroupRftReportModule,
    RftReportModule,
    KaizenReportModule,
    ReportRoutingModule,
  ],
})
export class ReportModule {}
