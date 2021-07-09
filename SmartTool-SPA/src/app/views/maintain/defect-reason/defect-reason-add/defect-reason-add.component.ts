import { Component, OnInit } from "@angular/core";
import { DefectReasonService } from "../../../../_core/_services/defect-reason.service";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-defect-reason-add",
  templateUrl: "./defect-reason-add.component.html",
  styleUrls: ["./defect-reason-add.component.scss"],
})
export class DefectReasonAddComponent implements OnInit {
  defectreason: any = {};
  flag = "100";
  constructor(
    private defectreasonService: DefectReasonService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.defectreasonService.currentdefectreason.subscribe(
      (defectreason) => (this.defectreason = defectreason)
    );
    // flag 1=add, 0=edit
    this.defectreasonService.currentFlag.subscribe(
      (flag) => (this.flag = flag)
    );

    if (this.flag === "0") this.defectreason.sequence = 0;
  }

  backList() {
    this.router.navigate(["./maintain/defect-reason/list"]);
  }

  saveAndNext() {
    console.log("save and next");
    if (this.flag === "0") {
      this.defectreasonService.createDefectReason(this.defectreason).subscribe(
        () => {
          this.alertify.success("Add succeed");
          this.defectreason = {};
          // save page
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }

  save() {
    if (this.flag === "0") {
      console.log("save add");
      this.defectreasonService.createDefectReason(this.defectreason).subscribe(
        () => {
          this.alertify.success("Add succeed");
          this.router.navigate(["./maintain/defect-reason/list"]);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    } else {
      console.log("save edit");
      this.defectreasonService.updateDefectReason(this.defectreason).subscribe(
        () => {
          this.alertify.success("Updated succeed");
          this.router.navigate(["./maintain/defect-reason/list"]);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }

  clear() {
    this.defectreason = {};
    this.router.navigate(["./maintain/defect-reason/list"]);
  }

  // // for Sequence column
  // numberOnly(event): boolean {
  //   const charCode = event.which ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;
  // }
}
