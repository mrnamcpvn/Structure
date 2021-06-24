import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RftReportRoutingModule } from './rft-report-routing.module';
import { RftListComponent } from './rft-list/rft-list.component';
import { RftDetailComponent } from './rft-detail/rft-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [
    RftListComponent,
    RftDetailComponent
  ],
  imports: [
    CommonModule,
    RftReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
  ]
})
export class RftReportModule { }
