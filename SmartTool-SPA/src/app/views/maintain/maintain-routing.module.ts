import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    data: {
      title: "Maintain",
    },
    children: [
      {
        path: "model",
        loadChildren: () =>
          import("./model/model.module").then((m) => m.ModelModule),
      },
      {
        path: "model-operation",
        loadChildren: () =>
          import("./model-operation/model-operation.module").then(
            (m) => m.ModelOperationModule
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
