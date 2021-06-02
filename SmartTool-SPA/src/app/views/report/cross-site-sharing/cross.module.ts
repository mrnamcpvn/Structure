import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighchartsChartModule } from "highcharts-angular";
import { ChartsModule } from "ng2-charts";
import { AlertModule } from "ngx-bootstrap/alert";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxPrintModule } from "ngx-print";
import { NgxSpinnerModule } from "ngx-spinner";
import { CrossRoutingModule } from "./cross-routing.module";
import { CrossSiteSharingEditComponent } from "./cross-site-sharing-edit/cross-site-sharing-edit.component";
import { CrossSiteSharingListComponent } from "./cross-site-sharing-list/cross-site-sharing-list.component";
import { CrossSiteSharingPdfListComponent } from "./cross-site-sharing-pdf-list/cross-site-sharing-pdf-list.component";
import { CrossSiteSharingPdfComponent } from "./cross-site-sharing-pdf/cross-site-sharing-pdf.component";

@NgModule({
  declarations: [
    CrossSiteSharingListComponent,
    CrossSiteSharingEditComponent,
    CrossSiteSharingPdfComponent,
    CrossSiteSharingPdfListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxSpinnerModule,
    ChartsModule,
    HighchartsChartModule,
    NgxPrintModule,
    AlertModule.forRoot(),
    CrossRoutingModule,
  ],
})
export class CrossModule {}
