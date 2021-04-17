import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { ModelOperationRoutingModule } from "./model-operation-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModelOperationRoutingModule,
    PaginationModule,
    NgSelect2Module,
  ],
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
  ],
})
export class ModelOperationModule {}
