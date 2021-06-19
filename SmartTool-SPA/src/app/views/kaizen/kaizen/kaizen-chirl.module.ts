import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KaizenChirlRoutingModule } from './kaizen-chirl-routing.module';
import { KaizenListComponent } from './kaizen-list/kaizen-list.component';
import { KaizenAddComponent } from './kaizen-add/kaizen-add.component';
import { KaizenEditComponent } from './kaizen-edit/kaizen-edit.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelect2Module } from 'ng-select2';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [
    KaizenListComponent,
    KaizenAddComponent,
    KaizenEditComponent],
  imports: [
    CommonModule,
      FormsModule,
      KaizenChirlRoutingModule,
      PaginationModule.forRoot(),
      NgSelect2Module,
      AlertModule.forRoot(),
  ]
})
export class KaizenChirlModule { }
