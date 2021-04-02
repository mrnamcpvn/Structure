import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RftDetailComponent } from './rft-detail/rft-detail.component';
import { RftListComponent } from './rft-list/rft-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Group RFT Report',
    },
    children: [
      {
        path: '',
        component: RftListComponent,
        data: {
          title: 'Group RFT List',
        },
      },
      {
        path: 'rft-detail',
        component: RftDetailComponent,
        data: {
          title: 'Group RFT Detail',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRftReportRoutingModule {}
