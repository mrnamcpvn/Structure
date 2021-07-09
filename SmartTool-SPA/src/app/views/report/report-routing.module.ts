import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../_core/_guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Report'
    },
    children: [
      {
        path: 'kaizen-report',
        loadChildren: () => import('./kaizen-report/kaizen-report.module').then(m => m.KaizenReportModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'group-kaizen-report',
        loadChildren: () => import('./group-kaizen-report/group-kaizen-report.module').then(m => m.GroupKaizenReportModule)
      },
      {
        path: 'rft-report',
        loadChildren: () => import('./rft-report/rft-report.module').then(m => m.RftReportModule)
      },
      // {
      //   path: 'group-rft-report',
      //   loadChildren: () => import('./group-rft-report/group-rft-report.module').then(m => m.GroupRftReportModule)
      // },
      // {
      //   canActivate: [AuthGuard],
      //   path: 'cross-site-sharing',
      //   loadChildren: () => import('./cross-site-sharing/cross.module').then(m => m.CrossSiteSharingModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
