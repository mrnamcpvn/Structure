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
        canActivate : [AuthGuard],
        path: 'kaizen-report',
        loadChildren: () => import('./kaizen-report/kaizen-report.module').then(m => m.KaizenReportModule)
      },
      {
        canActivate : [AuthGuard],
        path: 'group-kaizen-report',
        loadChildren: () => import('./group-kaizen-report/group-kaizen-report.module').then(m => m.GroupKaizenReportModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
