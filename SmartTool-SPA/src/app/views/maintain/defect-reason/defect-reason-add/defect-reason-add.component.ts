import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { DefectReasonService } from "./../../../../_core/_services/defect-reason.service";

@Component({
  selector: "app-defect-reason-add",
  templateUrl: "./defect-reason-add.component.html",
  styleUrls: ["./defect-reason-add.component.scss"],
})
export class DefectReasonAddComponent implements OnInit {
  defectReason: any = {};
  flag = "100";
  constructor(
    private defectReasonService: DefectReasonService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.defectReasonService.currentDefectReason.subscribe(
      (defectReason) => (this.defectReason = defectReason)
    );
    this.defectReasonService.currentFlag.subscribe((flag) => {
      this.flag = flag;
    });
    if (this.flag === "0") this.defectReason.sequence = 0;
  }

  backList() {
    this.router.navigate(["/maintain/defect-reason/list"]);
  }
  saveAndNext() {
    if (this.flag === "0") {
      this.defectReasonService.createDefectReason(this.defectReason).subscribe(
        () => {
          this.alertify.success("Thêm thành công");
          this.defectReason = {};
        },
        (error) => this.alertify.error(error)
      );
    }
  }
  clear() {
    this.defectReason = {};
  }
  save() {
    if (this.flag === "0") {
      this.defectReasonService.createDefectReason(this.defectReason).subscribe(
        () => {
          this.alertify.success("Thêm thành công");
          this.router.navigate(["/maintain/defect-reason/list"]);
        },
        (error) => this.alertify.error(error)
      );
    } else {
      this.defectReasonService.updateDefectReason(this.defectReason).subscribe(
        () => {
          this.alertify.success("Cập nhật thành công");
          this.router.navigate(["/maintain/defect-reason/list"]);
        },
        (error) => this.alertify.error(error)
      );
    }
  }
}
