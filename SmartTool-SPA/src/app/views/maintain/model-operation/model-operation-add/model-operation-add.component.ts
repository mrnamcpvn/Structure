import { AlertUtilityService } from './../../../../_core/_services/alertUtility.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ModelOperation } from '../../../../_core/_models/model-operation';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';

@Component({
  selector: 'app-model-operation-add',
  templateUrl: './model-operation-add.component.html',
  styleUrls: ['./model-operation-add.component.scss']
})
export class ModelOperationAddComponent implements OnInit {

  isCheckedQuality: any = false;
  isCheckedEfficiency: any = false;
  modelOperations = new ModelOperation;
  stageList : Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;
  modelName: string = '';
  constructor(private modelOperationService : ModelOperationService,
    private alertify: AlertUtilityService,
    private router: Router) { }

  ngOnInit() {
  }

  changeQuality() {
    this.modelOperations.critical_quality = this.isCheckedQuality;
  }

  changeEfficiency() {
    this.modelOperations.critical_efficiency = this.isCheckedEfficiency;
  }


  backList() {
    this.router.navigate(['/maintain/model-operation/list']);
  }

  saveAndNext() {
    this.modelOperationService.addModelOperation(this.modelOperations).subscribe(
      () => {
      this.alertify.success('Add succeed', 'Error');
      this.modelOperations = new ModelOperation;
      this.modelOperations.model_no = localStorage.getItem('modelNo');
      this.modelOperations.stage_id = '';
      this.modelOperations.process_type_id = '';
      this.isCheckedQuality = false;
      this.isCheckedEfficiency = false;
      },
      (error) => {
        this.alertify.error(error, 'Error');
      }
    );
  }

  save() {
    this.modelOperationService.addModelOperation(this.modelOperations).subscribe(
      () => {
      this.alertify.success('Add succeed', 'Success');
      this.router.navigate(['/maintain/model-operation/list']);
      },
      (error) => {
        this.alertify.error('Add ModelOperation failed on save', 'Error');
      }
    );
  }

  getStage() {
    this.modelOperationService.getStage().subscribe(res => {
      this.stageList = res.map(item => {
        return { id: item.stage_id, text: item.stage_name};
      });
    });
  }

}
