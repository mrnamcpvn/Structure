import { SnotifyModule } from 'ng-snotify';
import { ModelOperationModule } from './model-operation/model-operation.module';
import { ModelModule } from './model/model.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaintainRoutingModule } from './maintain-routing.module';

@NgModule({
  imports: [
    MaintainRoutingModule,
    HttpClientModule,
    SnotifyModule,
  ],
  declarations: [  ],
})
export class MaintainModule {}

