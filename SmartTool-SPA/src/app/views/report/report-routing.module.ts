import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Report",
    },
    children: [
      {
        path: "kaizen-report",
        data: {
          title: "Kaizen Report",
        },
        loadChildren: () =>
          import("./kaizen-report/kaizen-report.module").then(
            (x) => x.KaizenReportModule
          ),
      },
      {
        path: "group-kaizen-report",
        data: {
          title: "Group Kaizen Report",
        },
        loadChildren: () =>
          import("./group-kaizen-report/group-kaizen-report.module").then(
            (x) => x.GroupKaizenReportModule
          ),
      },
      {
        path: "rft-report",
        data: {
          title: "RFT Report",
        },
        loadChildren: () =>
          import("./rft-report/rft-report.module").then(
            (x) => x.RftReportModule
          ),
      },
      {
        path: "group-rft-report",
        data: {
          title: "Group RFT Report",
        },
        loadChildren: () =>
          import("./group-rft-report/group-rft-report.module").then(
            (x) => x.GroupRftReportModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
