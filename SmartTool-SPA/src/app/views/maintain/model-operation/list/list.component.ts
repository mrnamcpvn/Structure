import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ModelOperation } from "../../../../_core/_models/model-operation";
import { Pagination } from "../../../../_core/_models/pagination";
import { ModelOperationQuery } from "../../../../_core/_queries/model-operation.query";
import { ModelOperationService } from "../../../../_core/_services/model-operation.service";
import { CustomNgSnotifyService } from "../../../../_core/_services/snotify.service";
import { ModelOperationStore } from "../../../../_core/_stores/model-operation.store";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SignalrService } from "../../../../_core/_services/signalr.service";
@UntilDestroy()
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  modelOperations: ModelOperation[];
  modelList: Array<Select2OptionData>;
  stageList: Array<Select2OptionData>;

  paramSearch: any = {
    model_search: "BER58",
    stage: "CR2"
  };
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
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modelOperationStore: ModelOperationStore,
    private modelOperationQuery: ModelOperationQuery,
    private signalRService: SignalrService
  ) { }

  ngOnInit() {
    // this.getListModelNo();
    // this.getStage();
    // this.loadData();

    //create a 'entities' subscription
    this.modelOperationQuery.selectAll().pipe(untilDestroyed(this))
      .subscribe(modelOperations => this.modelOperations = modelOperations);
    //Create a 'Pagination' subscription
    this.modelOperationQuery.select(state => state.pagination)
      .subscribe(pagination => this.pagination = pagination);
    //gán modelNo vào modelList
    this.modelOperationService.getModelNo().subscribe();
    this.modelOperationQuery.select(state => state.modelNo).subscribe(modelNo => {
      this.modelList = modelNo.map(item => ({ id: item.model_no, text: item.model_no }));
      this.listdataModelNo = modelNo;
    });
    //gán stage vào stageList
    this.modelOperationService.getStage().subscribe();
    this.modelOperationQuery.select(state => state.stage).subscribe(stage => {
      this.stageList = stage.map(item => ({ id: item.stage_id, text: item.stage_name }));
    });
    localStorage.removeItem("modelLocal");

    let connection = this.signalRService.connectSignalR();

    connection.on("BroadcastMessage", () => this.loadData());

  }

  // getListModelNo() {
  //   this.modelOperationService.getModelNo().subscribe((res) => {
  //     this.listdataModelNo = res;
  //     this.modelList = res.map((item) => {
  //       return { id: item.model_no, text: item.model_no };
  //     });
  //   });
  // }
  addModelOperation() {
    let modelLocal = {
      modelNo: this.paramSearch.model_search,
      modelName: this.modelName,
    };
    localStorage.setItem("modelLocal", JSON.stringify(modelLocal));
    this.router.navigate(["/maintain/model-operation/add"]);
  }

  updateModelOperation(_id: string) {
    this.modelOperationStore.setActive(_id);
    this.router.navigate(['/maintain/model-operation/edit']);
  }

  deleteOperation(item: ModelOperation) {
    this.snotify.confirm("Are you sure you want to delete this Model Operation", "Delete Model Operation", () => {
      this.modelOperationService
        .deleteModelOperation(item)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.snotify.success("Model Operation was successfully deleted.", "Success!");
          this.modelOperationService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.paramSearch).subscribe();
        }, error => {
          this.snotify.error("Something wrong here!", "Error!");
        });
    });
  }

  loadData() {
    this.modelOperationService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.paramSearch).subscribe();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  search() {
    this.pagination.currentPage = 1;
    this.loadData();
  }

  clear() {
    this.paramSearch.model_search = null;
    this.paramSearch.stage = null;
    this.modelOperations = [];
  }
  changeModelNo(event: any) {
    if (event !== null) {
      this.modelName = this.listdataModelNo.find(
        (x) => x.model_no === event
      ).model_name;
    }

  }

  // loadData() {
  //   this.spinner.show();
  //   if (
  //     this.paramSearch.model_search == null &&
  //     this.paramSearch.state == null
  //   ) {
  //     this.noData = true;
  //     this.spinner.hide();
  //   } else {
  //     this.noData = false;
  //     this.modelOperationService
  //       .search(
  //         this.pagination.currentPage,
  //         this.pagination.itemsPerPage,
  //         this.paramSearch
  //       )
  //       .subscribe(
  //         (res: PaginatedResult<ModelOperation[]>) => {
  //           this.modelOperations = res.result;
  //           this.pagination = res.pagination;
  //           if (this.modelOperations.length == 0) {
  //             this.noData = true;
  //           }
  //           this.spinner.hide();
  //         },
  //         (error) => {
  //           this.snotify.error(error);
  //         }
  //       );
  //   }
  // }

  // search() {
  //   this.spinner.show();
  //   this.pagination.currentPage = 1;
  //   this.loadData();
  //   this.spinner.hide();
  // }

  // getStage() {
  //   this.modelOperationService.getStage().subscribe((res) => {
  //     this.stageList = res.map((item) => {
  //       return { id: item.stage_id, text: item.stage_name };
  //     });
  //   });
  // }

  // pageChanged(event: any): void {
  //   this.pagination.currentPage = event.page;
  //   this.loadData();
  // }

  // addModelOperation() {
  //   let modelLocal = {
  //     modelNo: this.paramSearch.model_search,
  //     modelName: this.modelName,
  //   };
  //   localStorage.setItem("modelLocal", JSON.stringify(modelLocal));
  //   this.router.navigate(["/maintain/model-operation/add"]);
  // }
  // updateModelOperation(item: ModelOperation) {
  //   let modelOperationEditParam = new ModelOperationEditParam();
  //   modelOperationEditParam.factory_id = item.factory_id;
  //   modelOperationEditParam.model_no = item.model_no;
  //   modelOperationEditParam.operation_id = item.operation_id;
  //   modelOperationEditParam.stage_id = item.stage_id;
  //   modelOperationEditParam.model_name = this.modelName;
  //   localStorage.setItem("modelOperationEditParam",JSON.stringify(modelOperationEditParam));
  //   this.router.navigate(['/maintain/model-operation/edit']);
  // }
  // deleteOperation(item: ModelOperation) {
  //   this.snotify.confirm('Delete Model Operation', 'Are you sure you want to delete this Model Operation ?', () => {
  //     this.modelOperationService.deleteModelOperation(item).subscribe(() => {
  //       this.loadData();
  //       this.snotify.success('Model Operation has been deleted');
  //     }, error => {
  //       this.snotify.error('This Model Operation is already in use');
  //     });
  //   });
  // }
}
