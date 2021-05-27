import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KaizenRftEditComponent } from "./kaizen-rft-edit/kaizen-rft-edit.component";
import { KaizenRftListComponent } from "./kaizen-rft-list/kaizen-rft-list.component";
export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Kaizen RFT",
    },
    children: [
      {
        path: "kaizen-rft-list",
        data: {
          title: "Kaizen RFT List",
        },
        component: KaizenRftListComponent,
      },
      {
        path: "kaizen-rft-edit/:modelNo/:serial_no",
        data: {
          title: "Edit Kaizen RFT",
        },
        component: KaizenRftEditComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaizenRFTRoutingModule {}
