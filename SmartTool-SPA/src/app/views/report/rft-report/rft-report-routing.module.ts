import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RftDetailComponent } from './rft-detail/rft-detail.component';
import { RftListComponent } from './rft-list/rft-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'RFT Report',
    },
    children: [
      {
        path: '',
        component: RftListComponent,
        data: {
          title: 'RFT List',
        },
      },
      {
        path: 'rft-detail',
        component: RftDetailComponent,
        data: {
          title: 'RFT Detail',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RftReportRoutingModule {}
