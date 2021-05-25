import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { Kaizen } from "../../../../_core/_model/kaizen";
import { Pagination } from "../../../../_core/_model/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { KaizenService } from "../../../../_core/_services/kaizen.service";

@Component({
  selector: "app-kaizen-list",
  templateUrl: "./kaizen-list.component.html",
  styleUrls: ["./kaizen-list.component.scss"],
})
export class KaizenListComponent implements OnInit {
  dataKaizen: Kaizen[] = [];
  listModelNo: Array<Select2OptionData>;
  modelName: string = "";
  upperID: string = "";
  modelNo: string = "";
  listDataModelNo: any;
  checkAddnew: boolean = false;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    totalItems: 1,
  };
  constructor(
    private kaizenService: KaizenService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getModelListNo();
  }

  getModelListNo() {
    this.kaizenService.getDataModelNo().subscribe((res) => {
      this.listDataModelNo = res;
      console.log(this.listDataModelNo);
    });
  }

  addNew() {}

  edit() {}

  changeModelNo(e: any) {}

  pageChanged() {}
}
