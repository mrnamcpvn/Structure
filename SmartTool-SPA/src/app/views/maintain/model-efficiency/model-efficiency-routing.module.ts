import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModelEfficiencyEditComponent } from "./model-efficiency-edit/model-efficiency-edit.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Model Efficiency",
    },
    children: [
      {
        path: "edit",
        data: {
          title: "Edit Model Efficiency",
        },
        component: ModelEfficiencyEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelEfficiencyRoutingModule {}
