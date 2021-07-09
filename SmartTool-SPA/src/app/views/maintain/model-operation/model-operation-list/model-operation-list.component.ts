import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { ModelOperation } from "../../../../_core/_models/model-operation";
import { ModelOperationEditParam } from "../../../../_core/_models/model-operationEditParam";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_models/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelOperationService } from "../../../../_core/_services/model-operation.service";

@Component({
  selector: "app-model-operation-list",
  templateUrl: "./model-operation-list.component.html",
  styleUrls: ["./model-operation-list.component.scss"],
})
export class ModelOperationListComponent implements OnInit {
  modelOperations: ModelOperation[];
  modelList: Array<Select2OptionData>;
  stageList: Array<Select2OptionData>;
  activeList: Array<Select2OptionData>;
  noData: boolean = false;
  isChecked: any = true;
  paramSearch: any = {};
  modelName: string = "";
  listdataModelNo: any;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private modelOperationService: ModelOperationService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getListModelNo();
    this.getStage();
    this.loadData();
    localStorage.removeItem("modelNo");
    localStorage.removeItem("modelOperationEditParam");
  }

  loadData() {
    this.spinner.show();
    if (
      this.paramSearch.model_search == null &&
      this.paramSearch.state == null
    ) {
      this.noData = true;
      this.spinner.hide();
    } else {
      this.noData = false;
      this.modelOperationService
        .search(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.paramSearch
        )
        .subscribe(
          (res: PaginatedResult<ModelOperation[]>) => {
            console.log(res);
            this.modelOperations = res.result;
            this.pagination = res.pagination;
            if (this.modelOperations.length == 0) {
              this.noData = true;
            }
            this.spinner.hide();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    }
  }

  clear() {
    this.paramSearch.model_search = null;
    this.paramSearch.stage = null;
    this.modelName = null;
    this.noData = true;
    this.modelOperations = [];
  }

  addModelOperation() {
    let modelLocal = {
      modelNo: this.paramSearch.model_search,
      modelName: this.modelName,
    };

    localStorage.setItem("modelLocal", JSON.stringify(modelLocal));
    this.router.navigate(["/maintain/model-operation/add"]);
  }

  updateModelOperation(item: ModelOperation) {
    let modelOperationEditParam = new ModelOperationEditParam();
    modelOperationEditParam.factory_id = item.factory_id;
    modelOperationEditParam.model_no = item.model_no;
    modelOperationEditParam.operation_id = item.operation_id;
    modelOperationEditParam.stage_id = item.stage_id;
    modelOperationEditParam.model_name = this.modelName;
    localStorage.setItem(
      "modelOperationEditParam",
      JSON.stringify(modelOperationEditParam)
    );
    this.router.navigate(["/maintain/model-operation/edit"]);
  }

  deleteOperation(item: ModelOperation) {
    this.alertify.confirm(
      "Delete Model Operation",
      "Are you sure you want to delete this Model Operation ?",
      () => {
        this.modelOperationService.deleteModelOperation(item).subscribe(
          () => {
            this.loadData();
            this.alertify.success("Model Operation has been deleted");
          },
          (error) => {
            this.alertify.error("This Model Operation is already in use");
          }
        );
      }
    );
  }

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadData();
    this.spinner.hide();
  }

  getListModelNo() {
    this.modelOperationService.getModelNo().subscribe((res) => {
      this.listdataModelNo = res;
      this.modelList = res.map((item) => {
        return { id: item.model_no, text: item.model_no };
      });
    });
  }

  getStage() {
    this.modelOperationService.getStage().subscribe((res) => {
      this.stageList = res.map((item) => {
        return { id: item.stage_id, text: item.stage_name };
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  changeModelNo(event: any) {
    this.modelName = "";
    if (event !== null) {
      this.modelName = this.listdataModelNo.find(
        (x) => x.model_no === event
      ).model_name;
    }
  }
}
