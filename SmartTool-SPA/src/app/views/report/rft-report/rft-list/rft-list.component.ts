import { Component, OnInit } from "@angular/core";
import { Select2OptionData } from "ng-select2";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_models/pagination";
// model & service from spa
import { RFTReport } from "../../../../_core/_models/rft-report";
import { RFTReportService } from "../../../../_core/_services/rft-report.service";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: "app-rft-list",
  templateUrl: "./rft-list.component.html",
  styleUrls: ["./rft-list.component.css"],
})
export class RftListComponent implements OnInit {
  rftreports: RFTReport[] = [];
  // rftreport: any = {};
  // API helper(query condition)
  paramSearch: any = {};
  model_no: string = "";
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  // searchKey = false;
  constructor(
    private rftreportService: RFTReportService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadrftreports();
  }

  // load data, call api
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
    // console.log("paramSearch: ", this.paramSearch);
    this.loadrftreports();
    this.spinner.hide();
  }

  // rft report detail
  detailRFTReport(model: RFTReport) {
    this.rftreportService.sendmodel(model);
    this.router.navigate(["/report/rft-report/rft-detail"]);
  }

  // clear inputbox
  clearSearch() {
    // this.rftreports.length = 0;
    this.model_no = "";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadrftreports();
  }
}
