import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { KaizenRFTModule } from './kaien-rft/kaizen-rft.module';
import { KaizenRoutingModule } from './kaizen-routing.module';
import { KaizenChirlModule } from './kaizen/kaizen-chirl.module';

@NgModule({
  imports: [
    KaizenChirlModule,
    KaizenRoutingModule,
    KaizenRFTModule,
    AlertModule.forRoot(),
  ],
  declarations: []
})
export class KaizenModule { }
