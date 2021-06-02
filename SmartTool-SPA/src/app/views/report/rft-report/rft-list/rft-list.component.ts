import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../../../environments/environment";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_model/pagination";
import { RFTReport } from "../../../../_core/_model/rft-report";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { RFTReportService } from "../../../../_core/_services/rft-report.service";

@Component({
  selector: "app-rft-list",
  templateUrl: "./rft-list.component.html",
  styleUrls: ["./rft-list.component.css"],
})
export class RftListComponent implements OnInit {
  rftreports: RFTReport[] = [];
  paramSearch: any = {};
  model_no: string = "";
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 1,
    totalPages: 1,
  };
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

  detailRFTReport(model: RFTReport) {
    this.rftreportService.sendmodel(model);
    this.router.navigate(["/report/rft-report/rft-detail"]);
  }

  clearSearch() {
    this.model_no = "";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadrftreports();
  }
}
