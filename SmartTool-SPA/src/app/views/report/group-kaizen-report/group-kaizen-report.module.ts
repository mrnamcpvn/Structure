import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GroupKaizenDetailComponent } from './group-kaizen-detail/group-kaizen-detail.component';
import { GroupKaizenListComponent } from './group-kaizen-list/group-kaizen-list.component';
import { GroupKaizenReportRoutingModule } from './group-kaizen-report-routing.module';
import { ModelDetailComponent } from './model-detail/model-detail.component';



@NgModule({
    declarations: [GroupKaizenListComponent, GroupKaizenDetailComponent, ModelDetailComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule,
        NgxSpinnerModule,
        ChartsModule,
        HighchartsChartModule,
        AlertModule.forRoot(),
        GroupKaizenReportRoutingModule
    ],
})
export class GroupKaizenReportModule { }
