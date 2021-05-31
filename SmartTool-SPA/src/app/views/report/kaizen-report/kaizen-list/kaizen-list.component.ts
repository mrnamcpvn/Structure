import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { Pagination } from "../../../../_core/_model/pagination";
import { FunctionUtility } from "../../../../_core/_utility/function-utility";
import { ModelKaizenReport } from "./../../../../_core/_model/model-kaizen-report";
import { AlertifyService } from "./../../../../_core/_services/alertify.service";
import { KaizenReportService } from "./../../../../_core/_services/kaizen-report.service";

@Component({
  selector: "app-kaizen-list",
  templateUrl: "./kaizen-list.component.html",
  styleUrls: ["./kaizen-list.component.scss"],
})
export class KaizenListComponent implements OnInit {
  filterPram: any;
  active: string = "all";
  model_no: string = "";
  models: ModelKaizenReport[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 2,
    totalItems: 1,
    totalPages: 1,
  };
  filterParam = {
    model_No: this.model_no.toUpperCase(),
    active: this.active,
  };
  constructor(
    private kaizenReportService: KaizenReportService,
    private router: Router,
    private snipper: NgxSpinnerModule,
    private alertify: AlertifyService,
    private utility: FunctionUtility
  ) {}

  ngOnInit() {}

  getData() {
    this.kaizenReportService
      .search(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.filterParam
      )
      .subscribe((res) => {
        this.models = res.result;
        this.models.map((item) => {
          item.volume_string = this.utility.convertNumber(item.volume);
          return item;
        });
        this.pagination = res.pagination;
      });
  }
  search() {
    this.pagination.currentPage = 1;
    this.getData();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getData();
  }
  modelDetail(model: ModelKaizenReport) {
    this.kaizenReportService.changeModel(model);
    this.router.navigate(["/report/kaizen-report/model-detail"]);
  }
  clear() {
    this.models.length = 0;
    this.model_no = "";
    this.active = "all";
  }
  exportExcel() {
    this.kaizenReportService.exportExcel(this.filterPram);
  }
}
