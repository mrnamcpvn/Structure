import { NgModule } from "@angular/core";
import { MaintainRoutingModule } from "./maintain-routing.module";
import { ModelOperationModule } from "./model-operation/model-operation.module";
import { ModelModule } from "./model/model.module";

@NgModule({
  declarations: [],
  imports: [ModelModule, ModelOperationModule, MaintainRoutingModule],
  providers: [],
})
export class MaintainModule {}
