import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Factory } from "../../../../_core/_model/factory";
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
  factories: Factory[];
  factory: string;
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
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.getAllFactory();
  }

  getAllFactory() {
    this.rftreportService.getAllFactory().subscribe((res) => {
      this.factories = res;
    });
  }
  loadrftreports() {
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
  }

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadrftreports();
    this.spinner.hide();
  }

  detailRFTReport(model: RFTReport) {
    this.rftreportService.sendmodel(model);
    this.router.navigate(["/report/group-rft-report/rft-detail"]);
  }

  clearSearch() {
    this.model_no = "";
    this.factory = null;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadrftreports();
  }
}
