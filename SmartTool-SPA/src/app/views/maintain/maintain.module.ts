import { NgModule } from '@angular/core';
import { MaintainRoutingModule } from './maintain-routing.module';
import { ModelEfficiencyModule } from './model-efficiency/model-efficiency.module';
import { ModelOperationModule } from './model-operation/model-operation.module';
import { ModelModule } from './model/model.module';
import { DefectReasonModule } from './defect-reason/defect-reason.module';

@NgModule({
  imports: [
    ModelModule,
    MaintainRoutingModule,
    ModelOperationModule,
    ModelEfficiencyModule,
    DefectReasonModule
  ],
  declarations: [

  ]
})

export class MaintainModule {
}
