import { SnotifyModule } from 'ng-snotify';
import { NgModule } from '@angular/core';
import { KaizenRoutingModule } from './kaizen-routing.module';
import { KaizenChildModule } from './kaizen/kaizen-child.module';
import { KaizenRFTModule } from './kaizen-rft/kaizen-rft.module';

@NgModule({
  declarations: [],
  imports: [
    KaizenChildModule,
    KaizenRFTModule,
    KaizenRoutingModule,
    SnotifyModule
  ],
})
export class KaizenModule {}
