import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KaizenAddComponent } from './kaizen/kaizen-add/kaizen-add.component';
import { KaizenEditComponent } from '../../views/kaizen/kaizen/kaizen-edit/kaizen-edit.component';
import { KaizenListComponent } from '../../views/kaizen/kaizen/kaizen-list/kaizen-list.component';
const routes: Routes = [
  {
    path: '',
    data: { title: 'kaizen-list' },
    component: KaizenListComponent
  },
  {
    path: 'kaizen-add',
    data: { title: 'Add Kaizen' },
    component: KaizenAddComponent
  },
  {
    path: 'kaizen-edit/:modelNo/:serial_no',
    data: { title: 'Edit Kaizen' },
    component: KaizenEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaizenChirlRoutingModule { }