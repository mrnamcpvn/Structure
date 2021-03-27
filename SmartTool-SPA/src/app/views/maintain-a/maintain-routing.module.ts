import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Maintain A'
    },
    children: [
      {
        path: 'model-a',
        loadChildren: () => import('./model/model.module').then(m => m.ModelAModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MaintainARoutingModule {}
