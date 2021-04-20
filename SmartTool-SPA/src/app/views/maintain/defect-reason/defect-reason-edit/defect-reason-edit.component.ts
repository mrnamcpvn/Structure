import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';
import { CustomNgSnotifyService } from '../../../../_core/_services/snotify.service';

@Component({
  selector: 'app-defect-reason-edit',
  templateUrl: './defect-reason-edit.component.html',
  styleUrls: ['./defect-reason-edit.component.scss']
})
export class DefectReasonEditComponent implements OnInit {
  defectreason: any = {};
  flag = "100";

  constructor(private defectreasonService : DefectReasonService,
    private snotify: CustomNgSnotifyService,
    private router: Router) { }

  ngOnInit() {
    this.defectreasonService.currentDefectReason.subscribe(
      (defectreason) => (this.defectreason = defectreason));
    this.defectreasonService.currentFlag.subscribe(
      (flag) => (this.flag = flag));
  }

  backList() {
    this.router.navigate(["./maintain/defect-reason/list"]);
  }

  clear() {
    this.defectreason = {};
  }

  save() {
    if(this.flag === "0"){
      console.log("save add");
      this.defectreasonService.createDefectReason(this.defectreason).subscribe(
        () => {
          this.snotify.success("Add succeed");
          this.router.navigate(["./maintain/defect-reason/list"]);
        },
        (error) => {
          this.snotify.error(error);
        }
      );
    } else {
      console.log("save edit");
      this.defectreasonService.updateDefectReason(this.defectreason).subscribe(
        () => {
          this.snotify.success("Updated succeed");
          this.router.navigate(["./maintain/defect-reason/list"]);
        },
        (error) => {
          this.snotify.error(error);
        }
      );
    }
  }

}
