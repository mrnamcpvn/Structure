import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";
import { AlertModule } from "ngx-bootstrap/alert";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModelOperationRoutingModule } from "../../maintain/model-operation/model-operation-routing.module";
import { KaizenDetailComponent } from "./kaizen-detail/kaizen-detail.component";
import { KaizenListComponent } from "./kaizen-list/kaizen-list.component";
import { KaizenReportRoutingModule } from "./kaizen-report-routing.module";
import { ModelDetailComponent } from "./model-detail/model-detail.component";

@NgModule({
  declarations: [
    KaizenDetailComponent,
    ModelDetailComponent,
    KaizenListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    ModelOperationRoutingModule,
    PaginationModule,
    NgSelect2Module,
    KaizenReportRoutingModule,
  ],
})
export class KaizenReportModule {}
