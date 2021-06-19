import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { ModelOperation } from '../../../../_core/_models/model-operation';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';

@Component({
  selector: 'app-model-operation-add',
  templateUrl: './model-operation-add.component.html',
  styleUrls: ['./model-operation-add.component.scss']
})
export class ModelOperationAddComponent implements OnInit {

  isCheckedQuality: any = false;
  isCheckedEfficiency: any = false;
  stageList : Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;
  modelOperations = new ModelOperation;
  modelName: string = "";

  constructor(
    private modelOperationService : ModelOperationService,
    private alertify: AlertifyService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("modelLocal")) {
      let modelLocal = JSON.parse(localStorage.getItem("modelLocal"));
      this.modelOperations.model_no = modelLocal.modelNo;
      this.modelName = modelLocal.modelName;
    } else {
      this.router.navigate(["/maintain/model-operation/list"]);
    }
    this.getStage();
    this.getProcessType();
    this.modelOperations.sequence = 0;
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
  changeQuality() {
    this.modelOperations.critical_quality = this.isCheckedQuality;
  }
  changeEfficiency() {
    this.modelOperations.critical_efficiency = this.isCheckedEfficiency;
  }


  saveAndNext() {
    this.modelOperationService.createModelOperation(this.modelOperations).subscribe(
      () => {
      this.alertify.success("Add succeed");
      this.modelOperations = new ModelOperation;
      this.modelOperations.model_no = localStorage.getItem("modelNo");
      this.modelOperations.stage_id = "";
      this.modelOperations.process_type_id = "";
      this.isCheckedQuality = false;
      this.isCheckedEfficiency = false;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  save() {
    this.modelOperationService.createModelOperation(this.modelOperations).subscribe(
      () => {
      this.alertify.success("Add succeed");
      this.router.navigate(["/maintain/model-operation/list"]);
      },
      (error) => {
        this.alertify.error("Add ModelOperation failed on save");
      }
    );
  }
}
