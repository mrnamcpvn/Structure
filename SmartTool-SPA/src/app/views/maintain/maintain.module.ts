import { NgModule } from '@angular/core';
import { MaintainRoutingModule } from './maintain-routing.module';
import { ModelModule } from './model/model.module';

@NgModule({
  imports: [
    ModelModule,
    MaintainRoutingModule
  ],
  declarations: [

  ]
})

export class MaintainModule {
}
