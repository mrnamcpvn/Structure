import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { MeasumentRFT } from "../../../_core/_model/measumentRFT";
import { Pagination } from "../../../_core/_model/pagination";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { RftService } from "../../../_core/_services/rft.service";

@Component({
  selector: "app-rft-list",
  templateUrl: "./rft-list.component.html",
  styleUrls: ["./rft-list.component.scss"],
})
export class RftListComponent implements OnInit {
  listDataModelNo: any;
  conditionFlag: boolean = false;
  isAddNew: boolean = true;
  listModelNo: Array<Select2OptionData>;
  listStage: Array<Select2OptionData>;
  dataMesuar: MeasumentRFT[] = [];
  modelNo: string = "none";
  modelName: string = "";
  upperID: string = "";
  stage: string = "";
  rftCondition: any = {};
  rft: any = {};
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private rftService: RftService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getListModelNo();
    this.getListStage();
  }
  addRFT() {
    this.rft = {};
    this.rftCondition = {
      modelNo: this.modelNo,
      modelName: this.modelName,
      upperID: this.upperID,
      stage: this.stage,
    };
    this.rftService.getRFTCondition(this.rftCondition);
    this.rftService.changedRFT(this.rft);
    this.router.navigate(["./measurement/add"]);
  }

  getListModelNo() {
    this.rftService.getDataModelNo().subscribe((res) => {
      this.listDataModelNo = res;
      this.listModelNo = res.map((item) => ({
        id: item.model_no,
        text: item.model_no,
      }));
    });
  }
  getListStage() {
    this.rftService.getDataStage().subscribe((res) => {
      this.listStage = res.map((item) => ({
        id: item.stage_id,
        text: item.stage_name,
      }));
    });
  }
  getData(currentPage = 1) {
    this.rftService
      .search(currentPage, this.modelNo, this.stage)
      .subscribe((res) => {
        this.pagination = res.pagination;
        this.dataMesuar = res.result;
      });
  }
  changeModelNo(event) {
    this.modelName = "";
    this.upperID = "";
    if (event != null) {
      this.modelName = this.listDataModelNo.find(
        (x) => x.model_no === event
      ).model_name;
      this.upperID = this.listDataModelNo.find(
        (x) => x.model_no === event
      ).upper_id;
      this.conditionFlag = true;
    }
    this.getData();
    this.addNewIsNull();
  }
  changeStage(event) {
    this.getData();
    this.addNewIsNull();
  }
  addNewIsNull() {
    this.rftService
      .getProcessType(this.modelNo, this.stage)
      .subscribe((res) => {
        if (res.length === 0) {
          this.isAddNew = false;
        } else {
          this.isAddNew = true;
        }
      });
  }
  pageChanged(event) {
    this.pagination.currentPage = event.page;
    this.getData(this.pagination.currentPage);
  }
  changeToEdit(measurament: MeasumentRFT) {
    this.rft = {};
    this.rftCondition = {
      modelNo: this.modelNo,
      modelName: this.modelName,
      upperID: this.upperID,
      stage: this.stage,
    };
    this.rftService.getRFTCondition(this.rftCondition);
    this.rftService.changedRFT(measurament);
    this.router.navigate(["./measurement/edit"]);
  }
}
