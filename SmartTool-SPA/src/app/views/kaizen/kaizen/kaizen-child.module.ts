import { SnotifyModule } from 'ng-snotify';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { KaizenChildRoutingModule } from './kaizen-child-routing.module';
import { KaizenListComponent } from './kaizen-list/kaizen-list.component';
import { KaizenAddComponent } from './kaizen-add/kaizen-add.component';
import { KaizenEditComponent } from './kaizen-edit/kaizen-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    KaizenChildRoutingModule,
    PaginationModule.forRoot(),
    NgSelect2Module,
    SnotifyModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    KaizenListComponent,
    KaizenAddComponent,
    KaizenEditComponent],
})
export class KaizenChildModule { }
