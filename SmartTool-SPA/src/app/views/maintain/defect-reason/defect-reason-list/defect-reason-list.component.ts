import { Component, OnInit } from "@angular/core";
import { Select2OptionData } from "ng-select2";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_models/pagination";
import { DefectReason } from "../../../../_core/_models/defect-reason";
import { DefectReasonService } from "../../../../_core/_services/defect-reason.service";
import { Router } from "@angular/router";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-defect-reason-list",
  templateUrl: "./defect-reason-list.component.html",
  styleUrls: ["./defect-reason-list.component.scss"],
})
export class DefectReasonListComponent implements OnInit {
  defectreasons: DefectReason[];
  defectreason: any = {};
  activeList: Array<Select2OptionData>;
  paramSearch: any = {}; // API helper(query condition)
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  // searchKey = false;
  constructor(
    private defectreasonService: DefectReasonService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.paramSearch.active = "all";
    this.paramSearch.defect_Reason = "";
    this.loadDefectReasons();
    this.spinner.hide();
  }

  // load data
  loadDefectReasons() {
    this.defectreasonService
      .search(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.paramSearch
      )
      .subscribe(
        (res: PaginatedResult<DefectReason[]>) => {
          this.defectreasons = res.result;
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
    this.loadDefectReasons();
    this.spinner.hide();
  }

  // open add page
  addDefectReason() {
    this.defectreason = {};
    this.defectreasonService.changeDefectReason(this.defectreason);
    this.defectreasonService.changeFlag("0");
    this.router.navigate(["/maintain/defect-reason/add"]);
  }

  // open edit page
  changeToEdit(defactreason: DefectReason) {
    this.defectreasonService.changeDefectReason(defactreason);
    this.defectreasonService.changeFlag("1");
    this.router.navigate(["/maintain/defect-reason/edit"]);
  }

  // clear inputbox
  clearSearch() {
    this.paramSearch.active = "all";
    this.paramSearch.defect_Reason = "";
    this.loadDefectReasons();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadDefectReasons();
  }
}
