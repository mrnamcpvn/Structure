import { NgModule } from "@angular/core";
import { AlertModule } from "ngx-bootstrap/alert";
import { KaizenRoutingModule } from "./kaizen-routing.module";
import { KaizenChildModule } from "./kaizen/kaizen-child.module";

@NgModule({
  declarations: [],
  imports: [KaizenRoutingModule, KaizenChildModule, AlertModule.forRoot()],
  providers: [],
  bootstrap: [],
})
export class KaizenModule {}
