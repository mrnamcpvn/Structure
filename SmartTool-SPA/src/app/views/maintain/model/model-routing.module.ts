import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Model",
    },
    children: [
      {
        path: "list",
        data: {
          title: "List Model",
        },
        component: ListComponent,
      },
      {
        path: "add",
        data: {
          title: "Add new Model",
        },
        component: AddComponent,
      },
      {
        path: "edit",
        data: {
          title: "Edit Model",
        },
        component: EditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelRoutingModule {}
