import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefectReasonAddComponent } from './defect-reason-add/defect-reason-add.component';
import { DefectReasonEditComponent } from './defect-reason-edit/defect-reason-edit.component';
import { DefectReasonListComponent } from './defect-reason-list/defect-reason-list.component';

const routes: Routes = [
  {
  path: '',
    data: {
      title: "Defect Reason",
    },
    children: [
      {
        path: "list",
        component: DefectReasonListComponent,
        data: {
          title: "List Defect Reason",
        },
      },
      {
        path: "add",
        component: DefectReasonAddComponent,
        data: {
          title: "Add Defect Reason",
        },
      },
      {
        path: "edit",
        component: DefectReasonEditComponent,
        data: {
          title: "Edit Defect Reason",
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefectReasonRoutingModule { }
