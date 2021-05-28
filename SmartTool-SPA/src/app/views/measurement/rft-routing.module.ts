import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RftAddComponent } from "./rft-add/rft-add.component";
import { RftEditComponent } from "./rft-edit/rft-edit.component";
import { RftListComponent } from "./rft-list/rft-list.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "RFT",
    },
    children: [
      {
        path: "list",
        data: {
          title: "List RFT",
        },
        component: RftListComponent,
      },
      {
        path: "add",
        data: {
          title: "Add RFT",
        },
        component: RftAddComponent,
      },
      {
        path: "edit",
        data: {
          title: "Edit RFT",
        },
        component: RftEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RftRoutingModule {}
