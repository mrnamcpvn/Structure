import { ModelOperationListComponent } from './model-operation/model-operation-list/model-operation-list.component';
import { ModelOperationEditComponent } from './model-operation/model-operation-edit/model-operation-edit.component';
import { ModelOperationAddComponent } from './model-operation/model-operation-add/model-operation-add.component';
import { ModelOperationRoutingModule } from './model-operation/model-operation-routing.module';
import { ModelOperationModule } from './model-operation/model-operation.module';
import { MaintainRoutingModule } from './maintain-routing.module';
import { ModelModule } from './model/model.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    ModelModule,
    MaintainRoutingModule,
    ModelOperationModule,
    ModelOperationRoutingModule,
    HttpClientModule
  ],
  declarations: [  ]
})
export class MaintainModule {}

