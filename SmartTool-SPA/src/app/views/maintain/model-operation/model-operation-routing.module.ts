import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";


const routes: Routes = [
    {
      path: 'model-operation',
      data: {
        title: 'Model-Operation'
      },
      children: [
        {
          path: 'list',
          component: ListComponent,
          data: {
            title: 'List Model-Operation'
          }
        },
        {
            path: 'add',
            component: AddComponent,
            data: {
              title: 'Add new Model-Operation'
            }
          },
          {
            path: 'edit',
            component: EditComponent,
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
