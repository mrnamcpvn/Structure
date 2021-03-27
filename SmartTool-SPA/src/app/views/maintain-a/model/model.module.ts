import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelARoutingModule } from './model-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../../../../environments/environment';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ModelARoutingModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxSpinnerModule,
    NgSelect2Module,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
  ],
  declarations: [
    AddComponent,
    EditComponent,
    ModelListComponent
  ]
})
export class ModelAModule {}
