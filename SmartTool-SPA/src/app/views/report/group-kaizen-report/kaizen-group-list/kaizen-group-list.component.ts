import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Factory } from "../../../../_core/_model/factory";
import { ModelKaizenReport } from "../../../../_core/_model/model-kaizen-report";
import { Pagination } from "../../../../_core/_model/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { GroupKaizenReportService } from "../../../../_core/_services/group-kaizen-report.service";
import { FunctionUtility } from "../../../../_core/_utility/function-utility";

@Component({
  selector: "app-kaizen-group-list",
  templateUrl: "./kaizen-group-list.component.html",
  styleUrls: ["./kaizen-group-list.component.scss"],
})
export class KaizenGroupListComponent implements OnInit {
  filterParam: any;
  model_no: string = "";
  active = "all";
  factories: Factory[];
  factory: string;
  models: ModelKaizenReport[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    totalPages: 0,
  };
  constructor(
    private kaizenGroupSerivce: GroupKaizenReportService,
    private spinnerService: NgxSpinnerService,
    private alertify: AlertifyService,
    private router: Router,
    private utility: FunctionUtility
  ) {}

  ngOnInit() {
    this.getAllFactory();
  }
  getAllFactory() {
    this.kaizenGroupSerivce.getAllFactory().subscribe((res) => {
      this.factories = res;
    });
  }
  getData() {
    if (
      this.factory === undefined ||
      this.factory === null ||
      this.factory === ""
    ) {
      this.alertify.error("Please option factory");
    } else {
      this.filterParam = {
        factory_id: this.factory,
        model_No: this.model_no.toUpperCase(),
        active: this.active,
      };
      this.spinnerService.show();
      this.kaizenGroupSerivce
        .search(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.filterParam
        )
        .subscribe((res) => {
          this.spinnerService.hide();
          this.models = res.result;
          this.models.map((obj) => {
            obj.volume_string = this.utility.convertNumber(obj.volume);
            return obj;
          });
          this.pagination = res.pagination;
        });
    }
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
    this.kaizenGroupSerivce.changeModel(model);
    this.router.navigate(["/report/group-kaizen-report/model-detail"]);
  }
  clear() {
    this.models.length = 0;
    this.model_no = "";
    this.active = "all";
    this.factory = "";
  }
  exportExcel() {
    if (this.factory === undefined || this.factory === null) {
      this.alertify.error("Please option factory!");
    } else {
      this.filterParam = {
        factory_id: this.factory,
        model_No: this.model_no.toUpperCase(),
        active: this.active,
      };
      this.kaizenGroupSerivce.exportExcel(this.filterParam);
    }
  }
}
