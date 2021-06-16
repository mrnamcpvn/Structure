import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelListComponent } from './model-list/model-list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModelListComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ModelRoutingModule,
    PaginationModule,
    NgxSpinnerModule,
    NgSelect2Module,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModelModule { }
