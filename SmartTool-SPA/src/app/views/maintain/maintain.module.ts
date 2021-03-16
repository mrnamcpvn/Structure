import { SnotifyModule, SnotifyService } from 'ng-snotify';
import { ModelOperationModule } from './model-operation/model-operation.module';
// import { MaintainRoutingModule } from './maintain-routing.module';
import { ModelModule } from './model/model.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    // MaintainRoutingModule,
    ModelModule,
    ModelOperationModule,
    HttpClientModule,
    SnotifyModule,
  ],
  declarations: [  ],
})
export class MaintainModule {}

