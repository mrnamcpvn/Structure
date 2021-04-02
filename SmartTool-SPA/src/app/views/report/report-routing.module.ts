import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'group-kaizen-report',
        loadChildren: () => import('./group-kaizen-report/group-kaizen-report.module').then(m => m.GroupKaizenReportModule)
      },
      {
        path: 'rft-report',
        loadChildren: () => import('./rft-report/rft-report.module').then(m => m.RftReportModule)
      },
      {
        path: 'group-rft-report',
        loadChildren: () => import('./group-rft-report/group-rft-report.module').then(m => m.GroupRftReportModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
