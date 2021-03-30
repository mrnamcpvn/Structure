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
        loadChildren: () => import('./kaizen/kaizen-child.module').then(m => m.KaizenChildModule)
      },
      {
        path: 'kaizen-rft',
        loadChildren: () => import('./kaizen-rft/kaizen-rft.module').then(m => m.KaizenRFTModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaizenRoutingModule { }
