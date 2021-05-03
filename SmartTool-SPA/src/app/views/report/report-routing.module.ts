import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_core/_guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Report'
    },
    children: [
      {
        canActivate: [AuthGuard],
        path: 'kaizen-report',
        loadChildren: () => import('./kaizen-report/kaizen-report.module').then(m => m.KaizenReportModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'group-kaizen-report',
        loadChildren: () => import('./group-kaizen-report/group-kaizen-report.module').then(m => m.GroupKaizenReportModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'rft-report',
        loadChildren: () => import('./rft-report/rft-report.module').then(m => m.RftReportModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'group-rft-report',
        loadChildren: () => import('./group-rft-report/group-rft-report.module').then(m => m.GroupRftReportModule)
      },
      {
        path: 'cross-site-sharing',
        loadChildren: () => import('./cross-site-sharing/cross.module').then(m => m.CrossSiteSharingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
