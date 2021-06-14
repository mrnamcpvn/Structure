import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefectReasonRoutingModule } from './defect-reason-routing.module';
import { DefectReasonListComponent } from './defect-reason-list/defect-reason-list.component';
import { DefectReasonAddComponent } from './defect-reason-add/defect-reason-add.component';
import { DefectReasonEditComponent } from './defect-reason-edit/defect-reason-edit.component';


@NgModule({
  declarations: [
    DefectReasonListComponent,
    DefectReasonAddComponent,
    DefectReasonEditComponent
  ],
  imports: [
    CommonModule,
    DefectReasonRoutingModule
  ]
})
export class DefectReasonModule { }
