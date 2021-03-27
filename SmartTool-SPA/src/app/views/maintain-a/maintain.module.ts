import { SnotifyModule } from 'ng-snotify';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaintainARoutingModule } from './maintain-routing.module';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    MaintainARoutingModule,
    HttpClientModule,
    SnotifyModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
  ],
  declarations: [  ],
})
export class MaintainAModule {}

