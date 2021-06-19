import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KaizenRoutingModule } from './kaizen-routing.module';
import { KaizenListComponent } from './kaizen/kaizen-list/kaizen-list.component';
import { KaizenAddComponent } from './kaizen/kaizen-add/kaizen-add.component';
import { KaizenEditComponent } from './kaizen/kaizen-edit/kaizen-edit.component';
import { KaizenChirlModule } from './kaizen/kaizen-chirl.module';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [

  ],
  imports: [
    KaizenChirlModule,
    KaizenRoutingModule,
    AlertModule.forRoot(),
  ]
})
export class KaizenModule { }
