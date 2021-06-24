import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRftReportRoutingModule } from './group-rft-report-routing.module';
import { RftListComponent } from './rft-list/rft-list.component';
import { RftDetailComponent } from './rft-detail/rft-detail.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    RftListComponent,
    RftDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupRftReportRoutingModule,
    AlertModule.forRoot(),
    PaginationModule,
  ]
})
export class GroupRftReportModule { }
