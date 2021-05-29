import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { AuthGuard } from "./_core/_guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
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
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "always",
        path: "maintain",
        loadChildren: () =>
          import("./views/maintain/maintain.module").then(
            (m) => m.MaintainModule
          ),
      },
      {
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "always",
        path: "kaizen",
        loadChildren: () =>
          import("./views/kaizen/kaizen.module").then((m) => m.KaizenModule),
      },
      {
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "always",
        path: "measurement",
        loadChildren: () =>
          import("./views/measurement/rft.module").then((m) => m.RftModule),
      },
      {
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "always",
        path: "report",
        loadChildren: () =>
          import("./views/report/report.module").then((m) => m.ReportModule),
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
