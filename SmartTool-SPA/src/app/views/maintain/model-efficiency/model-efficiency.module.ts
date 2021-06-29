import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelEfficiencyRoutingModule } from './model-efficiency-routing.module';
import { ModelEfficiencyEditComponent } from './model-efficiency-edit/model-efficiency-edit.component';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModelEfficiencyEditComponent
  ],
  imports: [
    CommonModule,
    ModelEfficiencyRoutingModule,
    NgSelect2Module,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModelEfficiencyModule { }
