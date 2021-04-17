import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgSelect2Module } from "ng-select2";
import { AlertModule } from "ngx-bootstrap/alert";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { ModelOperationListComponent } from "./model-operation-list/model-operation-list.component";
import { ModelOperationAddComponent } from "./model-operation-add/model-operation-add.component";
import { ModelOperationEditComponent } from "./model-operation-edit/model-operation-edit.component";
import { ModelOperationRoutingModule } from "./model-operation-routing.module";
@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    ModelOperationRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    NgSelect2Module,
  ],
  declarations: [
    ModelOperationListComponent,
    ModelOperationAddComponent,
    ModelOperationEditComponent,
  ],
  providers: [AlertifyService],
})
export class ModelOperationModule {}
