import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { AuthGuard } from "./_core/_guards/auth.guard";
export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard",
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
    path: "",
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
        path: "maintain",
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/maintain/maintain.module").then(
            (m) => m.MaintainModule
          ),
      },
      {
        path: 'kaizen',
        loadChildren: () => import('./views/kaizen/kaizen.module').then(m => m.KaizenModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
