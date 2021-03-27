import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelResolver } from '../../../_core/_resolvers/model.resolver';
import { ModelEditResolver } from '../../../_core/_resolvers/model-edit.resolver';


const routes: Routes = [
  {
    path: '',
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
        path: 'edit/:modelNo',
        component: EditComponent,
         resolve: {model: ModelEditResolver},
        data: {
          title: 'Edit model'
        }
      },
      {
        path: '',
        component: ModelListComponent,
         resolve: {model: ModelResolver},
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
export class ModelARoutingModule {}
