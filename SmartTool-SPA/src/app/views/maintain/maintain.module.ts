import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaintainRoutingModule } from "./maintain-routing.module";
import { ModelEfficiencyModule } from "./model-efficiency/model-efficiency.module";
import { ModelOperationModule } from "./model-operation/model-operation.module";
import { ModelModule } from "./model/model.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaintainRoutingModule,
    ModelModule,
    ModelOperationModule,
    ModelEfficiencyModule,
  ],
  providers: [],
})
export class MaintainModule {}
