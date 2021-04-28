import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MeasurementRoutingModule } from './measurement-routing.module';
import { RftAddComponent } from './rft-add/rft-add.component';
import { RftEditComponent } from './rft-edit/rft-edit.component';
import { RftListComponent } from './rft-list/rft-list.component';


@NgModule({
    imports: [
        MeasurementRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NgSelect2Module,
        AlertModule.forRoot()
    ],
    declarations: [
        RftAddComponent,
        RftEditComponent,
        RftListComponent
    ],
})
export class MeasurementModule { }

