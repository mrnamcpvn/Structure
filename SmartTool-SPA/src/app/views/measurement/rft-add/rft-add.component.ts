import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { RftService } from '../../../_core/_services/rft.service';
import { CustomNgSnotifyService } from '../../../_core/_services/snotify.service';

@Component({
  selector: 'app-rft-add',
  templateUrl: './rft-add.component.html',
  styleUrls: ['./rft-add.component.scss']
})
export class RftAddComponent implements OnInit {

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
    this.rft.total_produced_qty = 0;
    this.rft.defect_qty = 0;
    this.getProcessType();
    this.getDefectReason();

  }
  backList() {
    this.router.navigate(["./measurement/list"]);
  }

  clearInput() {
    this.rft.total_produced_qty = 0;
    this.rft.defect_qty = 0;
    this.rftpercent = 0;
    this.rft.defect_pic = "";
    this.rft.inspector = "";
    this.rft.defect_reason_id = "";
    this.process = "";
    this.getListOpera();
  }

  getListOpera() {
    this._rftService
      .getOperationName(
        this.rftcondition.modelNo,
        this.rftcondition.stage,
        this.process
      )
      .subscribe((res) => {
        // console.log(res);
        this.operationnameTypeList = res.map((item) => {
          return { id: item.operation_id, text: item.operation_name_local };
        });
        // this.dataKaizen.operation_id = "";
      });
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

  saveAndNext() {
    this.fillDataBeforeSave();
    this._rftService.createMeasurementRFT(this.rft).subscribe(
      () => {
        this.snotify.success("Add succeed");
        this.clearInput();
      },
      (error) => {
        this.snotify.error(error);
      }
    );
  }

  save() {
    this.fillDataBeforeSave();
    this._rftService.createMeasurementRFT(this.rft).subscribe(
      () => {
        this.snotify.success("Add succeed");
        this.router.navigate(["./measurement/list"]);
      },
      (error) => {
        this.snotify.error(error);
      }
    );
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

  fillDataBeforeSave() {
    this.rft.model_no = this.rftcondition.modelNo;
    this.rft.operation_id = this.operation;
    this.rft.rft_percent = this.rftpercent;
    this.rft.stage_id = this.rftcondition.stage;
  }

}
