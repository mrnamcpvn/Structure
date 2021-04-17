import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModelOperationResolver } from "../../../_core/_resolvers/model-operation.resolver";
import { ModelOperationAddComponent } from "./model-operation-add/model-operation-add.component";
import { ModelOperationEditComponent } from "./model-operation-edit/model-operation-edit.component";
import { ModelOperationListComponent } from "./model-operation-list/model-operation-list.component";

const routes: Routes = [
  {
    path: "model-operation",
    data: {
      title: "Model",
    },
    children: [
      {
        path: "list",
        component: ModelOperationListComponent,
        resolve: { modelOperations: ModelOperationResolver },
        data: {
          title: "List Model Operation",
        },
      },
      {
        path: "add",
        component: ModelOperationAddComponent,
        data: {
          title: "Add Model Operation",
        },
      },
      {
        path: "edit",
        component: ModelOperationEditComponent,
        data: {
          title: "Edit Model Operation",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelOperationRoutingModule {}
