import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
  
      {
        path: 'defect-reason',
        loadChildren: () => import('./defect-reason/defect-reason.module').then(m => m.DefectReasonModule)
      },
      {
        path: 'model',
        loadChildren: () => import('./model/model.module').then(m => m.ModelModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
