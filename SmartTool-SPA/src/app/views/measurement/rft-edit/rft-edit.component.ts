import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { RftService } from "../../../_core/_services/rft.service";

@Component({
  selector: "app-rft-edit",
  templateUrl: "./rft-edit.component.html",
  styleUrls: ["./rft-edit.component.scss"],
})
export class RftEditComponent implements OnInit {
  rft: any = {};
  rftCondition: any = {};
  rftPercent: number = 0;
  modelNo: string;
  stage: string;
  processTypeList: Array<Select2OptionData>;
  operationNameTypeList: Array<Select2OptionData>;
  defectReasonTypeList: Array<Select2OptionData>;

  constructor(
    private rftService: RftService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.rftPercent = this.rft.rft_percent;
    this.rftService.currentCondition.subscribe(
      (rftCondition) => (this.rftCondition = rftCondition)
    );
    this.rftService.currentRFT.subscribe((rft) => (this.rft = rft));
    this.getDataProcessOperation();
    this.getDefectReason();
    this.getProcessType();
  }
  backList() {
    this.router.navigate(["/measurement/list"]);
  }
  countRFTPercent(value: string, loR: string): void {
    if (loR === "L") {
      this.rft.total_produced_qty = value;
    } else if (loR === "R") {
      this.rft.defect_qty = value;
    }
    this.rftPercent =
      ((this.rft.total_produced_qty - this.rft.defect_qty) /
        this.rft.total_produced_qty) *
      100;
    this.rftPercent = +this.rftPercent.toFixed(2);
  }

  fillDataBeforeSave() {
    this.rft.model_no = this.rftCondition.modelNo;
    this.rft.rft_percent = this.rftPercent;
    this.rft.stage_id = this.rftCondition.stage;
  }

  save() {
    this.fillDataBeforeSave();
    this.rftService.updateMeasurementRFT(this.rft).subscribe(
      () => {
        this.alertify.success("Update succeed");
        this.router.navigate(["/measurement/list"]);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  getProcessType() {
    this.rftService
      .getProcessType(this.rftCondition.modelNo, this.rftCondition.stage)
      .subscribe((res) => {
        this.processTypeList = res.map((item) => ({
          id: item.process_type_id,
          text: item.process_type_name_local,
        }));
      });
  }
  getDataProcessOperation() {
    this.rftService
      .getProcessOperationForEdit(
        this.rft.model_no,
        this.rft.stage_id,
        this.rft.operation_id
      )
      .subscribe((res) => {
        this.operationNameTypeList = res.map((item) => {
          return { id: item.operation_id, text: item.operation_name_local };
        });
        this.processTypeList = res.map((item) => {
          return {
            id: item.process_type_id,
            text: item.process_type_name_local,
          };
        });
      });
  }

  getDefectReason() {
    this.rftService.getDataDefectReason().subscribe((res) => {
      this.defectReasonTypeList = res.map((item) => ({
        id: item.defect_reason_id,
        text: item.defect_reason_name,
      }));
    });
  }

  clearInput() {
    this.rft.defect_pic = "";
    this.rft.inspector = "";
    this.rft.defect_reason_id = "";
    this.rft.defect_qty = 0;
    this.rft.rftpercent = 0;
    this.rft.total_produced_qty = 0;
  }
}
