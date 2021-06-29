import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefectReasonRoutingModule } from './defect-reason-routing.module';
import { DefectReasonListComponent } from './defect-reason-list/defect-reason-list.component';
import { DefectReasonAddComponent } from './defect-reason-add/defect-reason-add.component';
import { DefectReasonEditComponent } from './defect-reason-edit/defect-reason-edit.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    DefectReasonListComponent,
    DefectReasonAddComponent,
    DefectReasonEditComponent
  ],
  imports: [
    CommonModule,
    DefectReasonRoutingModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
  ]
})
export class DefectReasonModule { }
