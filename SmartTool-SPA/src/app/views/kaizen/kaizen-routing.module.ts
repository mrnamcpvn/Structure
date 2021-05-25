import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Kaizen",
    },
    children: [
      {
        path: "kaizen",
        loadChildren: () =>
          import("./kaizen/kaizen-child.module").then(
            (x) => x.KaizenChildModule
          ),
      },
      // {
      //   path: "kaizen-rft",
      //   data: {
      //     title: "Kaizen RFT",
      //   },
      //   loadChildren: () =>
      //     import("./kaizen/kaizen-rft.module").then((x) => x.KaizenRFTModule),
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaizenRoutingModule {}
