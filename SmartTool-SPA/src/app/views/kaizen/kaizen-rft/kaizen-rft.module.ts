import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { KaizenRftEditComponent } from "./kaizen-rft-edit/kaizen-rft-edit.component";
import { KaizenRftListComponent } from "./kaizen-rft-list/kaizen-rft-list.component";
import { KaizenRFTRoutingModule } from "./kaizen-rft-routing.module";

@NgModule({
  declarations: [KaizenRftEditComponent, KaizenRftListComponent],
  imports: [
    CommonModule,
    FormsModule,
    KaizenRFTRoutingModule,
    NgxSpinnerModule,
    NgSelect2Module,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports: [],
  providers: [],
})
export class KaizenRFTModule {}
