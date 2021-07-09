import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
        loadChildren: () => import('./kaizen-rft/kaizen-rft.moudule').then(m => m.KaizenRFTModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaizenRoutingModule { }
