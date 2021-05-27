import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "../../../../_core/_model/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { KaizenService } from "../../../../_core/_services/kaizen.service";
import { Kaizen } from "./../../../../_core/_model/kaizen";

@Component({
  selector: "app-kaizen-rft-list",
  templateUrl: "./kaizen-rft-list.component.html",
  styleUrls: ["./kaizen-rft-list.component.scss"],
})
export class KaizenRftListComponent implements OnInit {
  dataKaizen: Kaizen[] = [];
  listModelNo: Array<Select2OptionData>;
  listDataModelNo: any;
  modelNo: string = "";
  modelName: string = "";
  upperID: string = "";
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private kaizenService: KaizenService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getListModelNo();
  }

  getListModelNo() {
    this.kaizenService.getDataModelNo().subscribe((res) => {
      this.listDataModelNo = res;
      this.listModelNo = res.map((item) => {
        return { id: item.model_no, text: item.model_no };
      });
    });
  }
  getData() {
    this.kaizenService
      .search(this.pagination.currentPage, this.modelNo)
      .subscribe((res) => {
        this.pagination = res.pagination;
        this.dataKaizen = res.result;
        this.spinner.hide();
      });
  }

  changeModelNo(event: any) {
    this.upperID = "";
    this.modelName = "";
    if (event != "") {
      this.upperID = this.listDataModelNo.find(
        (x) => x.model_no == event
      ).upper_id;
      this.modelName = this.listDataModelNo.find(
        (x) => x.model_no == event
      ).model_name;
    }
    this.getData();
  }

  edit(kaizen) {
    this.kaizenService.changeKaizen(kaizen);
    this.router.navigate([
      "/kaizen/kaizen-rft/kaizen-rft-edit/" +
        kaizen.model_no +
        "/" +
        kaizen.serial_no,
    ]);
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.getData();
  }
}
