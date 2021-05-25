import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { DefectReason } from "../../../../_core/_model/defect-reason";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_model/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { DefectReasonService } from "../../../../_core/_services/defect-reason.service";

@Component({
  selector: "app-defect-reason-list",
  templateUrl: "./defect-reason-list.component.html",
  styleUrls: ["./defect-reason-list.component.scss"],
})
export class DefectReasonListComponent implements OnInit {
  paramSearch: any = {};
  defectReason: any = {};
  defectReasons: DefectReason[];
  activeList: Array<Select2OptionData>;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private defectReasonService: DefectReasonService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.paramSearch.active = "";
    this.paramSearch.defect_Reason = "";
    this.loadDefectReasons();
    this.spinner.hide();
  }

  loadDefectReasons() {
    this.defectReasonService
      .search(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.paramSearch
      )
      .subscribe(
        (res: PaginatedResult<DefectReason[]>) => {
          this.defectReasons = res.result;
          this.pagination = res.pagination;
          this.spinner.hide();
        },
        (error) => this.alertify.error(error)
      );
  }

  search() {
    this.pagination.currentPage = 1;
    this.loadDefectReasons();
  }

  clearSearch() {
    this.paramSearch.active = "all";
    this.paramSearch.defect_Reason = "";
    this.search();
  }

  addDefectReason() {
    this.defectReason = {};
    this.defectReasonService.changeDefectReason(this.defectReason);
    this.defectReasonService.changeFlag("0");
    this.router.navigate(["/maintain/defect-reason/add"]);
  }
  changeToEdit(defectReason: DefectReason) {
    this.defectReasonService.changeDefectReason(defectReason);
    this.defectReasonService.changeFlag("1");
    this.router.navigate(["/maintain/defect-reason/add"]);
  }

  pagedChange(e: any) {
    this.pagination.currentPage = e.page;
    this.loadDefectReasons();
  }
}
