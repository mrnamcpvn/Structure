import { MaintainRoutingModule } from './maintain-routing.module';
import { EditComponent } from './model/edit/edit.component';
import { AddComponent } from './model/add/add.component';
import { ModelListComponent } from './model/model-list/model-list.component';
import { ModelModule } from './model/model.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ModelModule,
    MaintainRoutingModule
  ],
  declarations: [
    ModelListComponent,
    AddComponent,
    EditComponent
  ]
})
export class MaintainModule {}

