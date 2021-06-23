import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Kaizen'
    },
    children: [
      {
        path: 'kaizen',
        loadChildren: () => import('./kaizen/kaizen-chirl.module').then(m => m.KaizenChirlModule)
      },
      {
        path: 'kaizen-rft',
        loadChildren: () => import('./kaizen-rft/kaizen-rft.module').then(m => m.KaizenRftModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaizenRoutingModule { }
