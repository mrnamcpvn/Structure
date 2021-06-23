import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KaizenRftRoutingModule } from './kaizen-rft-routing.module';
import { KaizenRftListComponent } from './kaizen-rft-list/kaizen-rft-list.component';
import { NgSelect2Module } from 'ng-select2';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { KaizenRftEditComponent } from './kaizen-rft-edit/kaizen-rft-edit.component';


@NgModule({
  declarations: [
    KaizenRftListComponent,
    KaizenRftEditComponent
  ],
  imports: [
    CommonModule,
      FormsModule,
      KaizenRftRoutingModule,
      PaginationModule.forRoot(),
      NgSelect2Module,
      BsDatepickerModule.forRoot(),
      AlertModule.forRoot(),
  ]
})
export class KaizenRftModule { }
