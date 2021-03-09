import { ModelOperationListComponent } from './model-operation/model-operation-list/model-operation-list.component';
import { ModelOperationEditComponent } from './model-operation/model-operation-edit/model-operation-edit.component';
import { ModelOperationAddComponent } from './model-operation/model-operation-add/model-operation-add.component';
import { ModelOperationRoutingModule } from './model-operation/model-operation-routing.module';
import { ModelOperationModule } from './model-operation/model-operation.module';
import { MaintainRoutingModule } from './maintain-routing.module';
import { EditComponent } from './model/edit/edit.component';
import { AddComponent } from './model/add/add.component';
import { ModelListComponent } from './model/model-list/model-list.component';
import { ModelModule } from './model/model.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ModelModule,
    MaintainRoutingModule,
    ModelOperationModule,
    ModelOperationRoutingModule
  ],
  declarations: [
    ModelListComponent,
    AddComponent,
    EditComponent,
    ModelOperationAddComponent,
    ModelOperationEditComponent,
    ModelOperationListComponent
  ]
})
export class MaintainModule {}

