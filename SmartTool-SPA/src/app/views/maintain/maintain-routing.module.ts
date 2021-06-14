import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: '',
    data: {
      title: 'Maintain'
    },
    children:[
      {
        path:'defect-reason',
        loadChildren: () => import('./defect-reason/defect-reason.module').then(m => m.DefectReasonModule)
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
