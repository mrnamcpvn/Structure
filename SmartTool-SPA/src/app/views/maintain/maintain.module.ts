import { NgModule } from '@angular/core';
import { MaintainRoutingModule } from './maintain-routing.module';
import { ModelOperationModule } from './model-operation/model-operation.module';
import { ModelModule } from './model/model.module';

@NgModule({
  imports: [
    ModelModule,
    MaintainRoutingModule,
    ModelOperationModule
  ],
  declarations: [

  ]
})

export class MaintainModule {
}
