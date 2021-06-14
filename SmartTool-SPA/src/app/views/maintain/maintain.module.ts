import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainRoutingModule } from './maintain-routing.module';
import { DefectReasonModule } from './defect-reason/defect-reason.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaintainRoutingModule,
    DefectReasonModule,
  ]
})
export class MaintainModule { }
