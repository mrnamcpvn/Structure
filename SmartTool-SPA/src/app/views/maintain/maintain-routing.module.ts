import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Maintain",
    },
    children: [
      {
        path: "model",
        loadChildren: () =>
          import("./model/model.module").then((x) => x.ModelModule),
      },
      {
        path: "model-operation",
        loadChildren: () =>
          import("./model-operation/model-operation.module").then(
            (x) => x.ModelOperationModule
          ),
      },
      {
        path: "model-efficiency",
        loadChildren: () =>
          import("./model-efficiency/model-efficiency.module").then(
            (x) => x.ModelEfficiencyModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainRoutingModule {}
