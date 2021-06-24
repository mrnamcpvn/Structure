import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { RFTReport } from '../../../../_core/_models/rft-report';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { RftReportService } from '../../../../_core/_services/rft-report.service';

@Component({
  selector: 'app-rft-list',
  templateUrl: './rft-list.component.html',
  styleUrls: ['./rft-list.component.scss']
})
export class RftListComponent implements OnInit {



  paramSearch: any = {};
  model_no: string = "";
  rftreports: RFTReport[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private spinner: NgxSpinnerService,
    private rftreportService: RftReportService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadrftreports();
  }

  loadrftreports() {
    this.paramSearch = {
      factory_id: environment.factory,
      model_No: this.model_no.toUpperCase(),
    };
    this.spinner.show();
    this.rftreportService
      .searchRFTReport(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.paramSearch
      )
      .subscribe(
        (res: PaginatedResult<RFTReport[]>) => {
          this.rftreports = res.result;
          this.pagination = res.pagination;
          this.spinner.hide();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadrftreports();
    this.spinner.hide();
  }
  clear(){
    this.model_no ="";
    this.loadrftreports();
  }
  detailRFTReport(model: RFTReport) {
    this.rftreportService.rftDetail(model);
    this.router.navigate(["/report/rft-report/rft-detail"]);
  }

}
