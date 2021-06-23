import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainRoutingModule } from './maintain-routing.module';
import { DefectReasonModule } from './defect-reason/defect-reason.module';
import { ModelModule } from './model/model.module';
import { ModelOperationModule } from './model-operation/model-operation.module';
import { ModelEfficiencyModule } from './model-efficiency/model-efficiency.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaintainRoutingModule,
    DefectReasonModule,
    ModelModule,
    ModelOperationModule,
    ModelEfficiencyModule,
  ]
})
export class MaintainModule { }
