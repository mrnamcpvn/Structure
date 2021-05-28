import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";
import { AlertModule } from "ngx-bootstrap/alert";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { RftAddComponent } from "./rft-add/rft-add.component";
import { RftEditComponent } from "./rft-edit/rft-edit.component";
import { RftListComponent } from "./rft-list/rft-list.component";
import { RftRoutingModule } from "./rft-routing.module";

@NgModule({
  declarations: [RftListComponent, RftAddComponent, RftEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    PaginationModule,
    NgSelect2Module,
    RftRoutingModule,
  ],
})
export class RftModule {}
