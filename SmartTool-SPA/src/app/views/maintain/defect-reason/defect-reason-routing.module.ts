import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefectReasonAddComponent } from "./defect-reason-add/defect-reason-add.component";
import { DefectReasonEditComponent } from "./defect-reason-edit/defect-reason-edit.component";
import { DefectReasonListComponent } from "./defect-reason-list/defect-reason-list.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Defect Reason",
    },
    children: [
      {
        path: "edit",
        data: {
          title: "Edit Defect Reason",
        },
        component: DefectReasonEditComponent,
      },
      {
        path: "add",
        data: {
          title: "Add Defect Reason",
        },
        component: DefectReasonAddComponent,
      },
      {
        path: "list",
        data: {
          title: "Edit Defect Reason",
        },
        component: DefectReasonListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefectReasonRoutingModule {}
