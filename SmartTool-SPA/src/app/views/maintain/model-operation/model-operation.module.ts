import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";
import { AlertModule } from "ngx-bootstrap/alert";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModelOperationAddComponent } from "./model-operation-add/model-operation-add.component";
import { ModelOperationEditComponent } from "./model-operation-edit/model-operation-edit.component";
import { ModelOperationListComponent } from "./model-operation-list/model-operation-list.component";
import { ModelOperationRoutingModule } from "./model-operation-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    ModelOperationRoutingModule,
    PaginationModule,
    NgSelect2Module,
  ],
  declarations: [
    ModelOperationListComponent,
    ModelOperationAddComponent,
    ModelOperationEditComponent,
  ],
})
export class ModelOperationModule {}
