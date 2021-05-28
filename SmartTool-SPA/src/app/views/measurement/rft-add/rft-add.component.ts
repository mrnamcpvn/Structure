import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { RftService } from "../../../_core/_services/rft.service";

@Component({
  selector: "app-rft-add",
  templateUrl: "./rft-add.component.html",
  styleUrls: ["./rft-add.component.scss"],
})
export class RftAddComponent implements OnInit {
  rftcondition: any = {};
  rft: any = {};
  modelno: string;
  stage: string;
  process: string = "";
  operation: string = "";
  rftPercent: number = 0;
  processTypeList: Array<Select2OptionData>;
  operationNameTypeList: Array<Select2OptionData>;
  defectReasonTypeList: Array<Select2OptionData>;

  constructor(
    private rftService: RftService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.rftService.currentCondition.subscribe(
      (rftcondition) => (this.rftcondition = rftcondition)
    );
    this.rftService.currentRFT.subscribe((rft) => (this.rft = rft));
    this.rft.total_produced_qty = 0;
    this.rft.defect_qty = 0;
    this.getProcessType();
    this.getDefectReason();
  }

  getProcessType() {
    this.rftService
      .getProcessType(this.rftcondition.modelNo, this.rftcondition.stage)
      .subscribe((res) => {
        this.processTypeList = res.map((item) => {
          return {
            id: item.process_type_id,
            text: item.process_type_name_local,
          };
        });
      });
  }

  getListOpera() {
    this.rftService
      .getOperationName(
        this.rftcondition.modelNo,
        this.rftcondition.stage,
        this.process
      )
      .subscribe((res) => {
        this.operationNameTypeList = res.map((item) => {
          return { id: item.operation_id, text: item.operation_name_local };
        });
      });
  }

  getDefectReason() {
    this.rftService.getDataDefectReason().subscribe((res) => {
      this.defectReasonTypeList = res.map((item) => {
        return { id: item.defect_reason_id, text: item.defect_reason_name };
      });
    });
  }

  fillDataBeforeSave() {
    this.rft.model_no = this.rftcondition.modelNo;
    this.rft.operation_id = this.operation;
    this.rft.rft_percent = this.rftPercent;
    this.rft.stage_id = this.rftcondition.stage;
  }

  saveAndNext() {
    this.fillDataBeforeSave();
    this.rftService.createMeasurementRFT(this.rft).subscribe(
      () => {
        this.alertify.success("Add succeed");
        this.clearInput();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  save() {
    this.fillDataBeforeSave();
    this.rftService.createMeasurementRFT(this.rft).subscribe(
      () => {
        this.alertify.success("Add succeed");
        this.router.navigate(["./measurement/list"]);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  clearInput() {
    this.rft.total_produced_qty = 0;
    this.rft.defect_qty = 0;
    this.rftPercent = 0;
    this.rft.defect_pic = "";
    this.rft.inspector = "";
    this.rft.defect_reason_id = "";
    this.process = "";
    this.getListOpera();
  }

  countRFTPercent(Value: string, LorR: string): void {
    if (LorR === "L") {
      this.rft.total_produced_qty = Value;
    } else if (LorR === "R") {
      this.rft.defect_qty = Value;
    }
    this.rftPercent =
      ((this.rft.total_produced_qty - this.rft.defect_qty) /
        this.rft.total_produced_qty) *
      100;
    this.rftPercent = +this.rftPercent.toFixed(2);
  }

  backList() {
    this.router.navigate(["./measurement/list"]);
  }
}
