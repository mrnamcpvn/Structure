import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModelEfficiencyEditComponent } from "./model-efficiency-edit/model-efficiency-edit.component";
import { ModelEfficiencyRoutingModule } from "./model-efficiency-routing.module";






@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        PaginationModule,
        NgSelect2Module,
        ModelEfficiencyRoutingModule,
    ],
    declarations: [ModelEfficiencyEditComponent]
})

export class ModelEfficiencyModule{
}