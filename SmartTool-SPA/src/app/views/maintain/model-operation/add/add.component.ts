import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { ModelOperation } from '../../../../_core/_models/model-operation';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';
import { CustomNgSnotifyService } from '../../../../_core/_services/snotify.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  isCheckedQuality: any = false;
  isCheckedEfficiency: any = false;
  modelOperations = new ModelOperation;
  stageList : Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;
  modelName: string = "";
  constructor(
    private modelOperationService : ModelOperationService,
    private snotify: CustomNgSnotifyService,
    private router: Router
  ) { }

  ngOnInit() {
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

  backList() {
    this.router.navigate(["/maintain/model-operation/list"]);
  }

  changeQuality() {
    this.modelOperations.critical_quality = this.isCheckedQuality;
  }

  changeEfficiency() {
    this.modelOperations.critical_efficiency = this.isCheckedEfficiency;
  }
  
  save() {
    this.modelOperationService.createModelOperation(this.modelOperations).subscribe(
      () => {
      this.snotify.success("Add succeed");
      this.router.navigate(["/maintain/model-operation/list"]);
      },
      (error) => {
        this.snotify.error("Add ModelOperation failed on save");
      }
    );
  }

  saveAndNext() {
    this.modelOperationService.createModelOperation(this.modelOperations).subscribe(
      () => {
      this.snotify.success("Add succeed");
      this.modelOperations = new ModelOperation;
      this.modelOperations.model_no = localStorage.getItem("modelNo");
      this.modelOperations.stage_id = "";
      this.modelOperations.process_type_id = "";
      this.isCheckedQuality = false;
      this.isCheckedEfficiency = false;
      },
      (error) => {
        this.snotify.error(error);
      }
    );
  }

}
