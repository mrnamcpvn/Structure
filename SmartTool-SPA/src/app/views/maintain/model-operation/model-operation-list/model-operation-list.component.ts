import { AlertUtilityService } from './../../../../_core/_services/alertUtility.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModelOperation } from '../../../../_core/_models/model-operation';
import { ModelOperationEditParam } from '../../../../_core/_models/model-operationEditParam';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';

@Component({
  selector: 'app-model-operation-list',
  templateUrl: './model-operation-list.component.html',
  styleUrls: ['./model-operation-list.component.scss']
})
export class ModelOperationListComponent implements OnInit {

  modelOperations: ModelOperation[];
  modelList: Array<Select2OptionData>;
  stageList: Array<Select2OptionData>;
  activeList: Array<Select2OptionData>;
  noData: boolean = false;
  isChecked: any = true;
  paramSearch: any = {};
  modelName: string = '';
  listdataModelNo: any;
  // pagination: Pagination = {
  //   currentPage: 1,
  //   itemsPerPage: 10,
  //   totalItems: 1,
  //   totalPages: 1,
  // };
  constructor(private modelOperationService: ModelOperationService,
              private alertify: AlertUtilityService,
              private router: Router,
              private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.spinner.show();
      this.noData = false;
      this.modelOperationService.search(this.paramSearch)
      .subscribe(
        (res: PaginatedResult<ModelOperation[]>) => {
          this.modelOperations = res.result;
          // this.pagination = res.pagination;
          if (this.modelOperations.length == 0) {
            this.noData = true;
          }
          this.spinner.hide();
        },
        (error) => {
          this.alertify.error(error, 'Error');
        });

  }

  search() {
    this.spinner.show();
    // this.pagination.currentPage = 1;
    this.loadData();
    this.spinner.hide();
  }

  clear() {
    this.paramSearch.model_search = null;
    this.paramSearch.stage = null;
    this.noData = true;
    this.modelOperations = [];
  }

  addModelOperation() {
    const modelLocal = {
      modelNo: this.paramSearch.model_search,
      modelName: this.modelName
    };

    localStorage.setItem('modelLocal', JSON.stringify(modelLocal));
    this.router.navigate(['/maintain/model-operation/add']);
}

updateModelOperation(item: ModelOperation) {
  const modelOperationEditParam = new ModelOperationEditParam();
  modelOperationEditParam.factory_id = item.factory_id;
  modelOperationEditParam.model_no = item.model_no;
  modelOperationEditParam.operation_id = item.operation_id;
  modelOperationEditParam.stage_id = item.stage_id;
  modelOperationEditParam.model_name = this.modelName;
  localStorage.setItem('modelOperationEditParam', JSON.stringify(modelOperationEditParam));
  this.router.navigate(['/maintain/model-operation/edit']);
}

deleteOperation(operation: ModelOperation) {
    this.modelOperationService.deleteModelOperation(operation).subscribe(() => {
      console.log('Success');
      this.loadData();
      this.alertify.success('Model Operation has been deleted', 'Success');
    });
    this.alertify.warning('This Model Operation is already in use', 'Warning');
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
