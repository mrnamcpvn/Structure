import { ModelOperationListComponent } from './model-operation-list/model-operation-list.component';
import { ModelOperationEditComponent } from './model-operation-edit/model-operation-edit.component';
import { ModelOperationAddComponent } from './model-operation-add/model-operation-add.component';
import { NgModule } from '@angular/core';
import { ModelOperationRoutingModule } from './model-operation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    ModelOperationRoutingModule,
    PaginationModule,
    NgSelect2Module
  ],
  declarations: [
    ModelOperationAddComponent,
    ModelOperationEditComponent,
    ModelOperationListComponent
  ]
})
export class ModelOperationModule {}
