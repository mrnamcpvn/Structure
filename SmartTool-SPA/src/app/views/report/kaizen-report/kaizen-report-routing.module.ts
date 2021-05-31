import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../_core/_guards/auth.guard";
import { KaizenDetailComponent } from "./kaizen-detail/kaizen-detail.component";
import { KaizenListComponent } from "./kaizen-list/kaizen-list.component";
import { ModelDetailComponent } from "./model-detail/model-detail.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "",
    },
    children: [
      {
        canActivate: [AuthGuard],
        path: "main",
        data: {
          title: "Kaizen Report",
        },
        component: KaizenListComponent,
      },
      {
        canActivate: [AuthGuard],
        path: "model-detail",
        data: {
          title: "Model Detail",
        },
        component: ModelDetailComponent,
      },
      {
        canActivate: [AuthGuard],
        path: "kaizen-detail",
        data: {
          title: "Kaizen Report Detail",
        },
        component: KaizenDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaizenReportRoutingModule {}
