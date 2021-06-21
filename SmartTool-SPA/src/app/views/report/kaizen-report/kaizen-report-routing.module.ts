import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KaizenDetailComponent } from './kaizen-detail/kaizen-detail.component';
import { KaizenListComponent } from './kaizen-list/kaizen-list.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Kaizen Report'
    },
    children: [
      {
        path: 'list',
        component: KaizenListComponent,
        data: {
          title: 'Main'
        }
      },
      {
        path: 'model-detail',
        component: ModelDetailComponent,
        data: {
          title: 'Model Detail'
        }
      },
      {
        path: 'kaizen-detail',
        component: KaizenDetailComponent,
        data: {
          title: 'Kaizen Detail'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaizenReportRoutingModule { }
