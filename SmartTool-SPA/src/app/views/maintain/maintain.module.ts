import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaintainRoutingModule } from "./maintain-routing.module";
import { ModelOperationModule } from "./model-operation/model-operation.module";
import { ModelModule } from "./model/model.module";
@NgModule({
  imports: [
    MaintainRoutingModule,
    CommonModule,
    FormsModule,
    ModelModule,
    ModelOperationModule,
  ],
  declarations: [],
})
export class MaintainModule {}
