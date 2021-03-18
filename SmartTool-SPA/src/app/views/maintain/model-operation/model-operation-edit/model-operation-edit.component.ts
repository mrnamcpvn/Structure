import { AlertUtilityService } from './../../../../_core/_services/alertUtility.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelOperation } from '../../../../_core/_models/model-operation';
import { ModelOperationEditParam } from '../../../../_core/_models/model-operationEditParam';
import { Select2OptionData } from 'ng-select2';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';

@Component({
  selector: 'app-model-operation-edit',
  templateUrl: './model-operation-edit.component.html',
  styleUrls: ['./model-operation-edit.component.scss']
})
export class ModelOperationEditComponent implements OnInit {

  isCheckedQuality: any = false;
  isCheckedEfficiency: any = false;
  modelOperation = new ModelOperation();
  modelOperationEditParam = new ModelOperationEditParam();
  stageList: Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;
  constructor(private modelOperationService: ModelOperationService,
    private alertify: AlertUtilityService,
    private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('modelOperationEditParam')) {
      this.modelOperationEditParam = JSON.parse(localStorage.getItem('modelOperationEditParam'));
    } else {
      this.router.navigate(['/maintain/model-operation/list']);
    }
    this.loadModelOperation();
    // this.getStage();
    // this.getProcessType();
}

  loadModelOperation() {
    this.modelOperationService.getModelOperationEdit(this.modelOperationEditParam).subscribe((res) => {
        this.modelOperation = res;
      },
      (error) => {
        this.alertify.error('Can not load Model Operation', 'Error');
      }
    );
  }

  save() {
    this.modelOperationService.updateModelOperation(this.modelOperation).subscribe((res) => {
        this.router.navigate(['/maintain/model-operation/list']);
        this.alertify.success('Edit succeed ', 'Success');
      },
      (error) => {
        this.alertify.error('Can not update Model Operation', 'Error');
      }
    );
  }


  backList() {
    this.router.navigate(['/maintain/model-operation/list']);
  }

}
