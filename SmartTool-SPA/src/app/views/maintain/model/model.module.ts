import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModelRoutingModule } from "./model-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgSelect2Module } from "ng-select2"
import { ModelListComponent } from "./model-list/model-list.component";
import { ModelAddComponent } from "./model-add/model-add.component";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { ModelEditComponent } from "./model-edit/model-edit.component";
@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    ModelRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelect2Module,
  ],
  declarations: [
    ModelListComponent,
    ModelAddComponent,
    ModelEditComponent
  ],
  providers: [
    AlertifyService,
  ]
})
export class ModelModule {}
