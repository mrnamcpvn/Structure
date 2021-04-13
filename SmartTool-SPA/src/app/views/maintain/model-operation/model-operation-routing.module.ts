import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelOperationEditResolver } from '../../../_core/_resolvers/model-operation-edit.resolver';
import { ModelOperationAddComponent } from './model-operation-add/model-operation-add.component';
import { ModelOperationEditComponent } from './model-operation-edit/model-operation-edit.component';
import { ModelOperationListComponent } from './model-operation-list/model-operation-list.component';

const routes: Routes = [
  {
    path: 'model-operation',
    data: {
      title: 'Model-Operation'
    },
    children: [
      {
        path: 'list',
        component: ModelOperationListComponent,
        data: {
          title: 'List Model-Operation'
        }
      },
      {
        path: 'add',
        component: ModelOperationAddComponent,
        data: {
          title: 'Add new Model-Operation'
        }
      },
      {
        path: 'edit',
        component: ModelOperationEditComponent,
        //resolve: { res: ModelOperationEditResolver },
        data: {
          title: 'Edit Model'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModelOperationRoutingModule {
}
