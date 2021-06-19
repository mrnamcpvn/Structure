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
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaizenRoutingModule { }
