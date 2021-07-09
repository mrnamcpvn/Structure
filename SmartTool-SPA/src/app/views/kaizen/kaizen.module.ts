import { NgModule } from "@angular/core";
import { AlertModule } from 'ngx-bootstrap/alert';
import { KaizenRFTModule } from './kaizen-rft/kaizen-rft.moudule';
import { KaizenRoutingModule } from './kaizen-routing.module';
import { KaizenChirlModule } from './kaizen/kaizen-chirl.module';
@NgModule({
  declarations: [],
  imports: [
    KaizenChirlModule,
    KaizenRFTModule,
    KaizenRoutingModule,
    AlertModule.forRoot(),
  ],
})
export class KaizenModule {}
