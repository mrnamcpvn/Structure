import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { ModelOperationEditParam } from "../../../../_core/_models/mode-operationEditParam";
import { ModelOperation } from "../../../../_core/_models/model-operation";
import { ModelOperationService } from "../../../../_core/_services/model-operation.service";
import { CustomNgSnotifyService } from "../../../../_core/_services/snotify.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  isCheckedQuality: any = false;
  isCheckedEfficiency: any = false;
  modelOperation = new ModelOperation();
  modelOperationEditParam = new ModelOperationEditParam();
  stageList: Array<Select2OptionData>;
  processTypeList: Array<Select2OptionData>;
  constructor(
    private modelOperationService: ModelOperationService,
    private snotify: CustomNgSnotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("modelOperationEditParam")) {
      this.modelOperationEditParam = JSON.parse(
        localStorage.getItem("modelOperationEditParam")
      );
    } else {
      this.router.navigate(["/maintain/model-operation/list"]);
    }
    this.loadModelOperation();
    this.getStage();
    this.getProcessType();
  }

  loadModelOperation() {
    this.modelOperationService.getModelOperationEdit(this.modelOperationEditParam).subscribe(
      res => {
        this.modelOperation = res;
      }, error => {
        this.snotify.error("Can not load Model Operation");
      });
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

  save() {
    this.modelOperationService.updateModelOperation(this.modelOperation).subscribe(
      () => {
        this.router.navigate(["/maintain/model-operation/list"]);
        this.snotify.success("Edit succeed ");
      },
      (error) => {
        this.snotify.error("Can not update Model Operation");
      });
}
}
