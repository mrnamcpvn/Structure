import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ModelListComponent } from './model-list/model-list.component';

const routes: Routes = [
  {
    path: 'model',
    data: {
      title: 'Model'
    },
    children: [
      {
        path: 'add',
        component: AddComponent,
        data: {
          title: 'Add new model'
        }
      },
      {
        path: 'edit',
        component: EditComponent,
        // resolve: {model: ModelResolver},
        data: {
          title: 'Edit model'
        }
      },
      {
        path: 'list',
        component: ModelListComponent,
        // resolve: {model: ModelResolver},
        data: {
          title: 'List model'
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule {}
