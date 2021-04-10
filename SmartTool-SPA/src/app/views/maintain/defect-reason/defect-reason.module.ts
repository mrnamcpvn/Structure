import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap/alert";
import { DefectReasonAddComponent } from "./defect-reason-add/defect-reason-add.component";
import { DefectReasonEditComponent } from "./defect-reason-edit/defect-reason-edit.component";
import { DefectReasonListComponent } from "./defect-reason-list/defect-reason-list.component";
import { DefectReasonRoutingModule } from "./defect-reason-routing.module";
import { PaginationModule } from "ngx-bootstrap/pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    DefectReasonRoutingModule,
    PaginationModule,

  ],
  declarations: [
    DefectReasonListComponent,
    DefectReasonAddComponent,
    DefectReasonEditComponent,
  ],
})
export class DefectReasonModule { }
