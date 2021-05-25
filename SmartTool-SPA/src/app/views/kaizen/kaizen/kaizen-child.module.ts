import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { KaizenAddComponent } from "./kaizen-add/kaizen-add.component";
import { KaizenChildRoutingModule } from "./kaizen-child-routing.module";
import { KaizenEditComponent } from "./kaizen-edit/kaizen-edit.component";
import { KaizenListComponent } from "./kaizen-list/kaizen-list.component";

@NgModule({
  declarations: [KaizenAddComponent, KaizenEditComponent, KaizenListComponent],
  imports: [
    CommonModule,
    FormsModule,
    KaizenChildRoutingModule,
    NgxSpinnerModule,
    NgSelect2Module,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports: [],
  providers: [],
})
export class KaizenChildModule {}
