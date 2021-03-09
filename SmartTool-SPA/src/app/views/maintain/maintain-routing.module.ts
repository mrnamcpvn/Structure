import { AddComponent } from './model/add/add.component';
import { ModelListComponent } from './model/model-list/model-list.component';
import { EditComponent } from './model/edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Maintain'
    },
    children: [
      {
        path: 'model',
        loadChildren: () => import('./model/model.module').then(m => m.ModelModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MaintainRoutingModule {}
