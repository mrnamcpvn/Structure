import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelRoutingModule } from './model-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModelResolver } from '../../../_core/_resolvers/model.resolver';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ModelEditResolver } from '../../../_core/_resolvers/model-edit.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    ModelRoutingModule,
    PaginationModule,
    NgSelect2Module
  ],
  declarations: [
    ModelListComponent,
    AddComponent,
    EditComponent
  ],
  providers: [
    ModelResolver,
    ModelEditResolver,
  ]
})


export class ModelModule {
}
