import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { DateFormatter } from "ngx-bootstrap/datepicker";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ModelOperationEditParam } from "../../../../_core/_models/mode-operationEditParam";
import { ModelOperation } from "../../../../_core/_models/model-operation";
import { ModelOperationQuery } from "../../../../_core/_queries/model-operation.query";
import { ModelOperationService } from "../../../../_core/_services/model-operation.service";
import { CustomNgSnotifyService } from "../../../../_core/_services/snotify.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  editModelOperationForm: FormGroup;
  modelName: string = "";
  stageList: Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private modelOperationService: ModelOperationService,
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private fb: FormBuilder,
    private modelOperationQuery: ModelOperationQuery
  ) {
    this.initForm();
  }

  ngOnInit() {
    let models = this.modelOperationQuery.getActive() as ModelOperation;

    models ? this.editModelOperationForm.patchValue(models) : this.router.navigate(["/maintain/model-operation/list"]);

    this.modelOperationService.getStage().subscribe();
    this.modelOperationQuery.select(state => state.stage).subscribe(stage => {
      this.stageList = stage.map(item => ({ id: item.stage_id, text: item.stage_name }));
    });
    this.modelOperationService.getProcessType().subscribe();
    this.modelOperationQuery.select(state => state.processType).subscribe(processType => {
      this.processTypeList = processType.map(item => ({ id: item.process_type_id, text: item.process_type_name_en }));
    });
    this.modelOperationService.getModelNo().subscribe();
    this.modelOperationQuery.select(state => state.modelNo).subscribe(modelNo => {
      this.modelName = modelNo.filter(item => item.model_no === models.model_no)[0].model_name;
      this.editModelOperationForm.controls.model_name.setValue(this.modelName);
    });


    /////////////////////////////////////////////////////////////////
    // if (localStorage.getItem("modelOperationEditParam")) {      //
    //   this.modelOperationEditParam = JSON.parse(                //
    //     localStorage.getItem("modelOperationEditParam")         //
    //   );                                                        //
    // } else {                                                    //
    //   this.router.navigate(["/maintain/model-operation/list"]); //
    // }                                                           //
    // this.loadModelOperation();                                  //
    // this.getStage();                                            //
    // this.getProcessType();                                      //
    /////////////////////////////////////////////////////////////////
  }
  onSubmit(modelOperation: ModelOperation) {
    // modelOperation.create_by = JSON.parse(localStorage.getItem('user')).name;
    modelOperation.update_by = JSON.parse(localStorage.getItem('user')).name;
    // modelOperation.create_time = Date.now().toString();
    modelOperation.update_time = new Date(Date());
    this.modelOperationService.updateModelOperation(modelOperation)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.snotify.success("Model Operation was successfully update.", "Success!");
        this.router.navigate(["/maintain/model-operation/list"]);
      }, error => this.snotify.error(error, "Error!"));
  }

  backList() {
    this.router.navigate(["/maintain/model-operation/list"]);
  }

  initForm() {
    this.editModelOperationForm = this.fb.group({
      model_no: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      model_name: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      operation_id: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      stage_id: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
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
      create_by: "",
      update_by: ""
    });
  }

  cancel() {
    this.backList();
  }
  // loadModelOperation() {
  //   this.modelOperationService.getModelOperationEdit(this.modelOperationEditParam).subscribe(
  //     res => {
  //       this.modelOperation = res;
  //     }, error => {
  //       this.snotify.error("Can not load Model Operation");
  //     });
  // }

  // getStage() {
  //   this.modelOperationService.getStage().subscribe(res => {
  //     this.stageList = res.map(item => {
  //       return { id: item.stage_id, text: item.stage_name };
  //     });
  //   });
  // }

  // getProcessType() {
  //   this.modelOperationService.getProcessType().subscribe(res => {
  //     this.processTypeList = res.map(item => {
  //       return { id: item.process_type_id, text: item.process_type_name_en };
  //     });
  //   });
  // }

  // save() {
  //   this.modelOperationService.updateModelOperation(this.modelOperation).subscribe(
  //     () => {
  //       this.router.navigate(["/maintain/model-operation/list"]);
  //       this.snotify.success("Edit succeed ");
  //     },
  //     (error) => {
  //       this.snotify.error("Can not update Model Operation");
  //     });
  // }
}
