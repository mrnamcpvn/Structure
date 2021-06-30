import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Factory } from '../../../../_core/_models/factory';
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


  factories: Factory[];
  factory: string;
  paramSearch: any = {};
  model_no: string ="";
  rftreports: RFTReport[] = [];
  pagination: Pagination = {
    currentPage: 1,
    totalPage: 0,
    pageSize: 10,
    totalCount: 0,
  };
  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private rftreportService: RftReportService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getAllFactory();
  }
  getAllFactory() {
    this.rftreportService.getAllFactory().subscribe((res) => {
      this.factories = res;
    });
  }

  loadrftreports() {
    // debugger;
    if (this.factory === undefined || this.factory === null) {
      this.alertify.error("Please option factory");
    } else {
      this.paramSearch = {
        factory_id: this.factory,
        model_No: this.model_no.toUpperCase(),
      };
      this.spinner.show();
      this.rftreportService
        .searchRFTReport(
          this.pagination.currentPage,
          this.pagination.pageSize,
          this.paramSearch
        )
        .subscribe(
          (res: PaginatedResult<RFTReport>) => {
            this.rftreports = res.result;
            this.pagination = res.pagination;
            this.spinner.hide();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    }
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
    this.router.navigate(["/report/group-rft-report/rft-detail"]);
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadrftreports();
  }

}
