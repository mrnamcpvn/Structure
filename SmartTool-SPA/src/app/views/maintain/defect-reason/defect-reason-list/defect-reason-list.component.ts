import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { DefectReason } from "../../../../_core/_models/defect-reason";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_models/pagination";
import { DefectReasonService } from "../../../../_core/_services/defect-reason.service";
import { CustomNgSnotifyService } from "../../../../_core/_services/snotify.service";

@Component({
  selector: "app-defect-reason-list",
  templateUrl: "./defect-reason-list.component.html",
  styleUrls: ["./defect-reason-list.component.scss"],
})
export class DefectReasonListComponent implements OnInit {
  defectReasons: DefectReason[];
  defectReason: any = {};
  activeList: Array<Select2OptionData>;
  paramSearch: any = {};
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };

  constructor(
    private defectReasonService: DefectReasonService,
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.paramSearch.active = "all";
    this.paramSearch.defect_Reason = "";
    this.loadDefectReason();
    this.spinner.hide();
  }

  loadDefectReason() {
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
        (error) => {
          this.snotify.error(error);
        }
      );
  }

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadDefectReason();
    this.spinner.hide();
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
    this.router.navigate(["/maintain/defect-reason/edit"]);
  }

  clearSearch() {
    this.paramSearch.active = "all";
    this.paramSearch.defect_Reason = "";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadDefectReason();
  }
}
