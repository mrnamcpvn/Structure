import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select2OptionData } from 'ng-select2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModelOperation } from '../../../../_core/_models/model-operation';
import { ModelOperationQuery } from '../../../../_core/_queries/model-operation.query';
import { ModelOperationService } from '../../../../_core/_services/model-operation.service';
import { CustomNgSnotifyService } from '../../../../_core/_services/snotify.service';
@UntilDestroy()
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addModelOperationForm: FormGroup;
  stageList: Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;
  modelName: string = "";
  modelno: string = "";
  constructor(
    private modelOperationService: ModelOperationService,
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private fb: FormBuilder,
    private modelOperationQuery: ModelOperationQuery
  ) { this.initForm() }

  ngOnInit() {
    if (localStorage.getItem("modelLocal")) {
      let modelLocal = JSON.parse(localStorage.getItem("modelLocal"));
      this.modelno = modelLocal.modelNo;
      this.modelName = modelLocal.modelName;
    }
    this.addModelOperationForm.controls.model_name.setValue(this.modelName);
    this.addModelOperationForm.controls.model_no.setValue(this.modelno);

    this.modelOperationService.getStage().subscribe();
    this.modelOperationQuery.select(state => state.stage).subscribe(stage => {
      this.stageList = stage.map(item => ({ id: item.stage_id, text: item.stage_name }));
    });

    this.modelOperationService.getProcessType().subscribe();
    this.modelOperationQuery.select(state => state.processType).subscribe(processType => {
      this.processTypeList = processType.map(item => ({ id: item.process_type_id, text: item.process_type_name_en }));
    });


    // if(localStorage.getItem("modelLocal")) {
    //   let modelLocal = JSON.parse(localStorage.getItem("modelLocal"));
    //   this.modelOperations.model_no = modelLocal.modelNo;
    //   this.modelName = modelLocal.modelName;
    // } else {
    //   this.router.navigate(["/maintain/model-operation/list"]);
    // }
    // this.getStage();
    // this.getProcessType();
    // this.modelOperations.sequence = 0;
  }


  save(modelOperation: ModelOperation) {
    modelOperation.create_by = JSON.parse(localStorage.getItem('user')).name;
    modelOperation.update_by = JSON.parse(localStorage.getItem('user')).name;
    modelOperation.create_time = new Date(Date());
    modelOperation.update_time = modelOperation.create_time;
    this.modelOperationService.createModelOperation(modelOperation).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.snotify.success("Create Model Operation Successful");
        this.router.navigate(["/maintain/model-operation/list"]);
      }, error => this.snotify.error(error));
  }

  // getStage() {
  //   this.modelOperationService.getStage().subscribe(res => {
  //     this.stageList = res.map(item => {
  //       return { id: item.stage_id, text: item.stage_name};
  //     });
  //   });
  // }


  // getProcessType() {
  //   this.modelOperationService.getProcessType().subscribe(res => {
  //     this.processTypeList = res.map(item => {
  //       return { id: item.process_type_id, text: item.process_type_name_en};
  //     });
  //   });
  // }
  initForm() {
    this.addModelOperationForm = this.fb.group({
      model_no: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      model_name: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      operation_id: ["", Validators.compose([Validators.required])],
      stage_id: ["", Validators.compose([Validators.required])],
      operation_name_local: ["", Validators.compose([Validators.required])],
      process_type_id: ["", Validators.compose([Validators.required])],
      operation_name_en: ["", Validators.compose([Validators.required])],
      sop_no: [""],
      operation_name_zh: ["", Validators.compose([Validators.required])],
      critical_quality: false,
      sequence: 0,
      critical_efficiency: false,
      create_time: "",
      update_time: "",
      create_by: Date,
      update_by: Date
    });
  }

  cancel() {
    this.router.navigate(["/maintain/model-operation/list"]);
  }

  backList() {
    this.router.navigate(["/maintain/model-operation/list"]);
  }

  // changeQuality() {
  //   this.modelOperations.critical_quality = this.isCheckedQuality;
  // }

  // changeEfficiency() {
  //   this.modelOperations.critical_efficiency = this.isCheckedEfficiency;
  // }

  // save() {
  //   this.modelOperationService.createModelOperation(this.modelOperations).subscribe(
  //     () => {
  //     this.snotify.success("Add succeed");
  //     this.router.navigate(["/maintain/model-operation/list"]);
  //     },
  //     (error) => {
  //       this.snotify.error("Add ModelOperation failed on save");
  //     }
  //   );
  // }

  // saveAndNext() {
  //   this.modelOperationService.createModelOperation(this.modelOperqations).subscribe(
  //     () => {
  //     this.snotify.success("Add succeed");
  //     this.modelOperations = new ModelOperation;
  //     this.modelOperations.model_no = localStorage.getItem("modelNo");
  //     this.modelOperations.stage_id = "";
  //     this.modelOperations.process_type_id = "";
  //     this.isCheckedQuality = false;
  //     this.isCheckedEfficiency = false;
  //     },
  //     (error) => {
  //       this.snotify.error(error);
  //     }
  //   );
  // }

}
