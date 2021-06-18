import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';

@Component({
  selector: 'app-model-operation-add',
  templateUrl: './model-operation-add.component.html',
  styleUrls: ['./model-operation-add.component.scss']
})
export class ModelOperationAddComponent implements OnInit {

  stageList : Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;

  constructor(
    private modelOperationService : ModelOperationService,
    private alertify: AlertifyService,
    private router:Router,
  ) { }

  ngOnInit(): void {
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
}
