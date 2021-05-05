import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { AlertModule } from "ngx-bootstrap/alert";
import { ModelListComponent } from "./model-list/model-list.component";
import { NgSelect2Module } from "ng-select2";
import { ModelRoutingModule } from "./model-routing.module";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    ModelRoutingModule,
    PaginationModule,
    NgSelect2Module,
  ],
  declarations: [ModelListComponent, AddComponent, EditComponent],
})
export class ModelModule { }
