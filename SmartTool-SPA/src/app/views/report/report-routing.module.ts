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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
