import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelRoutingModule } from './model-routing.module';



@NgModule({
  imports: [
    ModelRoutingModule,
  ],
  declarations: [
    AddComponent,
    EditComponent,
    ModelListComponent
  ]
})
export class ModelModule {}
