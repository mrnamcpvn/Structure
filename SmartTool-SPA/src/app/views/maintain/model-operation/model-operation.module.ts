import { ModelOperationListComponent } from './model-operation-list/model-operation-list.component';
import { ModelOperationEditComponent } from './model-operation-edit/model-operation-edit.component';
import { ModelOperationAddComponent } from './model-operation-add/model-operation-add.component';
import { NgModule } from '@angular/core';
import { ModelOperationRoutingModule } from './model-operation-routing.module';

@NgModule({
  imports: [
    ModelOperationRoutingModule
  ],
  declarations: [
    ModelOperationAddComponent,
    ModelOperationEditComponent,
    ModelOperationListComponent
  ]
})
export class ModelOperationModule {}
