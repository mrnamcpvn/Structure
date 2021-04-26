import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelect2Module } from 'ng-select2';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { KaizenChirlRoutingModule } from './kaizen-chirl-routing.module';
import { KaizenListComponent } from './kaizen-list/kaizen-list.component';
import { KaizenAddComponent } from './kaizen-add/kaizen-add.component';
import { KaizenEditComponent } from './kaizen-edit/kaizen-edit.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    NgSelect2Module,
    KaizenChirlRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [KaizenListComponent, KaizenAddComponent, KaizenEditComponent]
})
export class KaizenChirlModule { }
