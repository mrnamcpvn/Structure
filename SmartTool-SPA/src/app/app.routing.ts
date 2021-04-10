import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './_core/_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,

    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        path: 'maintain',
        loadChildren: () => import('./views/maintain/maintain.module').then(m => m.MaintainModule)
      },
      // {
      //   path: 'report',
      //   loadChildren: () => import('./views/report/report.module').then(m => m.ReportModule)
      // },
      // {
      //   canActivate: [AuthGuard],
      //   path: 'user',
      //   loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
      // },
      // {
      //   path: 'measurement',
      //   loadChildren: () => import('./views/measurement/measurement.module').then(m => m.MeasurementModule)
      // },
      // {
      //   path: 'kaizen',
      //   loadChildren: () => import('./views/kaizen/kaizen.module').then(m => m.KaizenModule)
      // },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
