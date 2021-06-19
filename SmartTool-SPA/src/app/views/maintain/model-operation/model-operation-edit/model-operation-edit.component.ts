import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { ModelOperation } from '../../../../_core/_models/model-operation';
import { ModelOperationEditParam } from '../../../../_core/_models/model-operationEditParam';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';

@Component({
  selector: 'app-model-operation-edit',
  templateUrl: './model-operation-edit.component.html',
  styleUrls: ['./model-operation-edit.component.scss']
})
export class ModelOperationEditComponent implements OnInit {

  modelOperation = new ModelOperation();
  isCheckedQuality: any = false;
  isCheckedEfficiency: any = false;
  stageList : Array<Select2OptionData>;
  modelOperationEditParam = new ModelOperationEditParam();
  processTypeList: Array<Select2OptionData>;
  constructor(
    private modelOperationService: ModelOperationService,
    private router: Router,
    private alertify : AlertifyService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("modelOperationEditParam")) {
      this.modelOperationEditParam = JSON.parse(localStorage.getItem("modelOperationEditParam"));
    } else {
      this.router.navigate(["/maintain/model-operation/list"]);
    }
    this.loadModelOperation();
    this.getStage();
    this.getProcessType();
  }


  backList() {
    this.router.navigate(["/maintain/model-operation/list"]);
  }


  getStage() {
    this.modelOperationService.getStage().subscribe(res => {
      this.stageList = res.map(item => {
        return { id: item.stage_id, text: item.stage_name};
      });
    });
  }


  getProcessType() {
    this.modelOperationService.getProcessType().subscribe(res => {
      this.processTypeList = res.map(item => {
        return { id: item.process_type_id, text: item.process_type_name_en};
      });
    });
  }

  loadModelOperation() {
    this.modelOperationService.getModelOperationEdit(this.modelOperationEditParam).subscribe(
      res => {
        this.modelOperation = res;
      }, error => {
        this.alertify.error("Can not load Model Operation");
      });
  }

  save() {
    this.modelOperationService.updateModelOperation(this.modelOperation).subscribe(
      () => {
        this.router.navigate(["/maintain/model-operation/list"]);
        this.alertify.success("Edit succeed ");
      },
      (error) => {
        this.alertify.error("Can not update Model Operation");
      });
}
}
