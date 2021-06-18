import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelOperationRoutingModule } from './model-operation-routing.module';
import { ModelOperationListComponent } from './model-operation-list/model-operation-list.component';
import { ModelOperationAddComponent } from './model-operation-add/model-operation-add.component';
import { ModelOperationEditComponent } from './model-operation-edit/model-operation-edit.component';
import { NgSelect2Module } from 'ng-select2';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ModelOperationListComponent,
    ModelOperationAddComponent,
    ModelOperationEditComponent
  ],
  imports: [
    CommonModule,
    ModelOperationRoutingModule,
    NgSelect2Module,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    PaginationModule,
    
  ]
})
export class ModelOperationModule { }
