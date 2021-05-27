import { NgModule } from "@angular/core";
import { AlertModule } from "ngx-bootstrap/alert";
import { KaizenRFTModule } from "./kaizen-rft/kaizen-rft.module";
import { KaizenRoutingModule } from "./kaizen-routing.module";
import { KaizenChildModule } from "./kaizen/kaizen-child.module";

@NgModule({
  declarations: [],
  imports: [
    KaizenRoutingModule,
    KaizenChildModule,
    KaizenRFTModule,
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [],
})
export class KaizenModule {}
