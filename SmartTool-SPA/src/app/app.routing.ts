import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { CardsComponent } from "./views/base/cards.component";

import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { UserComponent } from "./views/user/user/user.component";
import { AuthGuard } from "./_core/_guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },

  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "base",
        loadChildren: () =>
          import("./views/base/base.module").then((m) => m.BaseModule),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      ///
      {
        path: "maintain",
        loadChildren: () =>
          import("./views/Maintain/maintain.module").then(
            (m) => m.MaintainModule
          ),
      },
      {
        path: "kaizen",
        loadChildren: () =>
          import("./views/kaizen/kaizen-main.module").then(
            (m) => m.KaizenMainModule
          ),
      },
      {
        path: "report",
        loadChildren: () =>
          import("./views/report/report.module").then(
            (m) => m.ReportModule
          ),
      },
      {
        path: "user",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./views/user/user.module").then((m) => m.UserModule),
      },
    ],
  },
  { path: "**", component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
