import { ModelOperationListComponent } from './model-operation-list/model-operation-list.component';
import { ModelOperationAddComponent } from './model-operation-add/model-operation-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelOperationEditComponent } from './model-operation-edit/model-operation-edit.component';

const routes: Routes = [
  {
    path: 'model-operation',
    data: {
      title: 'Model operation'
    },
    children: [
      {
        path: 'add',
        component: ModelOperationAddComponent,
        data: {
          title: 'Add new model operation'
        }
      },
      {
        path: 'edit',
        component: ModelOperationEditComponent,
        data: {
          title: 'Edit Model operation'
        }
      },
      {
        path: 'list',
        component: ModelOperationListComponent,
        data: {
          title: 'List model operation'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelOperationRoutingModule {}
