import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { KaizenRoutingModule } from './kaizen-routing.module';
import { KaizenChirlModule } from './kaizen/kaizen-chirl.module';

@NgModule({
  imports: [
    KaizenChirlModule,
    KaizenRoutingModule,
    AlertModule.forRoot(),
  ],
  declarations: []
})
export class KaizenModule { }
