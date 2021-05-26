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
  ) { }

  ngOnInit() {
    this.getModelListNo();
  }
  getModelListNo() {
    this.kaizenService.getDataModelNo().subscribe((res) => {
      this.listDataModelNo = res;
      this.listModelNo = res.map((item) => {
        return { id: item.model_no, text: item.model_no };
      });
    });
  }

  changeModelNo(e: any) {
    this.upperID = "";
    this.modelName = "";
    if (e != "") {
      this.upperID = this.listDataModelNo.find((x) => x.model_no == e).upper_id;
      this.modelName = this.listDataModelNo.find(
        (x) => x.model_no == e
      ).model_name;
      this.checkAddnew = true;
    } else {
      this.checkAddnew = false;
    }
    this.getData();
  }

  addNew(kaizen: Kaizen) {
    this.kaizenService.changeModel(this.modelNo, this.modelName);
    this.router.navigate(["/kaizen/kaizen-add"]);
  }

  getData() {
    this.spinner.show();
    this.kaizenService
      .search(this.pagination.currentPage, this.modelNo)
      .subscribe(
        (res) => {
          this.pagination = res.pagination;
          this.dataKaizen = res.result;
          this.spinner.hide();
          console.log("Data:", this.dataKaizen);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  edit(kaizen) {
    this.router.navigate([
      "/kaizen/kaizen-edit/" + kaizen.model_no + "/" + kaizen.serial_no,
    ]);
  }

  pageChanged(event) {
    this.pagination.currentPage = event.page;
    this.getData();
  }
}
