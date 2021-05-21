import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { ModelOperation } from "../../../../_core/_model/model-operation";
import { ModelOperationEditParam } from "../../../../_core/_model/model-operationEditParam";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_model/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelOperationService } from "../../../../_core/_services/model-operation.service";

@Component({
  selector: "app-model-operation-list",
  templateUrl: "./model-operation-list.component.html",
  styleUrls: ["./model-operation-list.component.scss"],
})
export class ModelOperationListComponent implements OnInit {
  modelOperations: ModelOperation[];
  listDataModelNo: any[] = [];
  stageList: Array<Select2OptionData>;
  modelList: Array<Select2OptionData>;
  paramSearch: any = {
    model_search: "",
    stage: "",
  };
  isChecked: boolean = true;
  noData: boolean = false;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 1,
    totalPages: 1,
  };
  modelName: string = "";
  constructor(
    private modelOperationService: ModelOperationService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getListModeNo();
    this.getStage();
    this.loadData();
    localStorage.removeItem("modelNo");
    localStorage.removeItem("modelOperationEditParam");
  }

  loadData() {
    this.spinner.show();
    if (
      this.paramSearch.model_search == null &&
      this.paramSearch.stage == null
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
  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadData();
    this.spinner.hide();
  }
  addModelOperation() {
    let modelLocal = {
      modelNo: this.paramSearch.model_search,
      modelName: this.modelName,
    };
    //add vào localStorage
    localStorage.setItem("modelLocal", JSON.stringify(modelLocal));
    this.router.navigate(["/maintain/model-operation/add"]);
  }
  deleteModelOperation(item: ModelOperation) {
    this.alertify.confirm("Delete Model Operation", "Bạn chắc chắn ?", () => {
      this.modelOperationService.deleteModelOperation(item).subscribe(
        () => {
          this.loadData();
          this.alertify.success("Xóa thành công");
        },
        (error) => this.alertify.error(error)
      );
    });
  }
  updateModelOperation(item: ModelOperation) {
    let modelOperationEditParam = new ModelOperationEditParam();
    modelOperationEditParam.factory_id = item.factory_id;
    modelOperationEditParam.model_no = item.model_no;
    modelOperationEditParam.stage_id = item.stage_id;
    modelOperationEditParam.operation_id = item.operation_id;
    modelOperationEditParam.model_name = this.modelName;
    localStorage.setItem(
      "modelOperationEditParam",
      JSON.stringify(modelOperationEditParam)
    );
    this.router.navigate(["/maintain/model-operation/edit"]);
  }
  changeModelNo(event: any) {
    this.modelName = "";
    if (event !== null) {
      // this.modelName ===
      // this.listDataModelNo.find((x) => x.model_no === event).model_name;
      this.modelName = this.listDataModelNo.filter(
        (x) => x.model_no === event
      )[0].model_name;
    }
  }
  pageChanged(e: any): void {
    this.pagination.currentPage = e.page;
    this.loadData();
  }

  getListModeNo() {
    this.modelOperationService.getModelNo().subscribe((res: any[]) => {
      this.listDataModelNo = res;
      this.modelList = res.map((item) => {
        return { id: item.model_no, text: item.model_no };
      });
      if (this.modelList.length > 0) {
        this.paramSearch.model_search = this.modelList[0].id;
      }
    });
  }
  getStage() {
    this.modelOperationService.getStage().subscribe((res) => {
      this.stageList = res;
      this.stageList = res.map((item) => {
        return { id: item.stage_id, text: item.stage_id };
      });
    });
  }

  clear() {
    this.paramSearch.model_search = null;
    this.paramSearch.stage = null;
    this.noData = true;
    this.modelOperations = [];
  }
}
