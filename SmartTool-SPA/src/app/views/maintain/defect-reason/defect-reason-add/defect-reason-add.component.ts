import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';
import { CustomNgSnotifyService } from '../../../../_core/_services/snotify.service';

@Component({
  selector: 'app-defect-reason-add',
  templateUrl: './defect-reason-add.component.html',
  styleUrls: ['./defect-reason-add.component.scss']
})
export class DefectReasonAddComponent implements OnInit {
  defectreason: any = {};
  flag = "100";
  constructor(private defectreasonService: DefectReasonService,
    private snotify: CustomNgSnotifyService,
    private router: Router) { }

  ngOnInit() {
    this.defectreasonService.currentDefectReason.subscribe(
      (defectreason) => (this.defectreason = defectreason));
    this.defectreasonService.currentFlag.subscribe(
      (flag) => (this.flag = flag));

    if(this.flag === "0") this.defectreason.sequence = 0;
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

  saveAndNext(){
    console.log("save and next");
    if (this.flag === "0") {
      this.defectreasonService.createDefectReason(this.defectreason).subscribe(
        () => {
          this.snotify.success("Add succeed");
          this.defectreason = {};
          // save page
        },
        (error) => {
          this.snotify.error(error);
        }
      );
    }
  }
}
