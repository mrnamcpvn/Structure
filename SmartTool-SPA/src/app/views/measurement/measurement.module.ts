import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurementRoutingModule } from './measurement-routing.module';
import { RftListComponent } from './rft-list/rft-list.component';
import { RftAddComponent } from './rft-add/rft-add.component';
import { RftEditComponent } from './rft-edit/rft-edit.component';
import { NgSelect2Module } from 'ng-select2';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RftListComponent,
    RftAddComponent,
    RftEditComponent
  ],
  imports: [
    CommonModule,
    MeasurementRoutingModule,
    NgSelect2Module,
    AlertModule.forRoot(),
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MeasurementModule { }
