import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { RftService } from '../../../_core/_services/rft.service';
import { CustomNgSnotifyService } from '../../../_core/_services/snotify.service';

@Component({
  selector: 'app-rft-edit',
  templateUrl: './rft-edit.component.html',
  styleUrls: ['./rft-edit.component.scss']
})
export class RftEditComponent implements OnInit {
  constructor(
    private _rftService: RftService,
    private snotify: CustomNgSnotifyService,
    private router: Router
  ) { }
  rftcondition: any = {};
  rft: any = {};
  modelno: string;
  stage: string;
  process: string = "";
  operation: string = "";
  rftpercent: number = 0;
  processTypeList: Array<Select2OptionData>;
  operationnameTypeList: Array<Select2OptionData>;
  defectreasonTypeList: Array<Select2OptionData>;

  ngOnInit() {
    this._rftService.currentCondition.subscribe(
      (rftcondition) => (this.rftcondition = rftcondition)
    );
    this._rftService.currentRFT.subscribe((rft) => (this.rft = rft));
    this.rftpercent = this.rft.rft_percent;
    this.getProcessType();
    this.getDefectReason();
    this.getDataProcessNOperation();
  }
  getProcessType() {
    this._rftService
      .getProcessType(this.rftcondition.modelNo, this.rftcondition.stage)
      .subscribe((res) => {
        // console.log(res);
        this.processTypeList = res.map((item) => {
          return {
            id: item.process_type_id,
            text: item.process_type_name_local,
          };
        });
      });
  }

  getDefectReason() {
    this._rftService.getDataDefectReason().subscribe((res) => {
      this.defectreasonTypeList = res.map((item) => {
        return { id: item.defect_reason_id, text: item.defect_reason_name };
      });
    });
  }

  getDataProcessNOperation() {
    this._rftService.getProcessNOperationForEdit(
      this.rft.model_no,
      this.rft.stage_id,
      this.rft.operation_id
    ).subscribe(res => {
      this.operationnameTypeList = res.map(item => {
        return { id: item.operation_id, text: item.operation_name_local };
      });
      this.processTypeList = res.map(item => {
        return { id: item.process_type_id, text: item.process_type_name_local };
      });
    });
  }

  clearInput() {
    this.rft.total_produced_qty = 0;
    this.rft.defect_qty = 0;
    this.rftpercent = 0;
    this.rft.defect_pic = "";
    this.rft.inspector = "";
    this.rft.defect_reason_id = "";
  }
  fillDataBeforeSave() {
    this.rft.model_no = this.rftcondition.modelNo;
    this.rft.rft_percent = this.rftpercent;
    this.rft.stage_id = this.rftcondition.stage;
  }

  countRFTPercent(Value: string, LorR: string): void {
    if (LorR === "L") {
      this.rft.total_produced_qty = Value;
    } else if (LorR === "R") {
      this.rft.defect_qty = Value;
    }
    this.rftpercent =
      ((this.rft.total_produced_qty - this.rft.defect_qty) /
        this.rft.total_produced_qty) *
      100;
    this.rftpercent = +this.rftpercent.toFixed(2);
  }

  save() {
    this.fillDataBeforeSave();
    this._rftService.updateMeasurementRFT(this.rft).subscribe(
      () => {
        this.snotify.success("Updated succeed");
        this.router.navigate(["./measurement/list"]);
      },
      (error) => {
        this.snotify.error(error);
      }
    );
  }

  backList() {
    this.router.navigate(["./measurement/list"]);
  }



}
