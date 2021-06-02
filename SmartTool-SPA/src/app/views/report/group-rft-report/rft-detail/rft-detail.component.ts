import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { RFTReportDetail } from "../../../../_core/_model/rft-report-detail";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { AuthService } from "../../../../_core/_services/auth.service";
import { RFTReportService } from "../../../../_core/_services/rft-report.service";

@Component({
  selector: "app-rft-detail",
  templateUrl: "./rft-detail.component.html",
  styleUrls: ["./rft-detail.component.css"],
})
export class RftDetailComponent implements OnInit {
  rftreportdetails: RFTReportDetail[];
  model: any = {};
  avgdata: any = null;
  cr2: string = null;
  sms: string = null;
  cs1: string = null;
  cs2: string = null;
  cs3: string = null;
  prod1: string = null;
  prod2: string = null;
  mp1: string = null;
  mp2: string = null;
  mp3: string = null;
  totalavg: string = null;

  constructor(
    private rftReportService: RFTReportService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.rftReportService.currentModel.subscribe(
      (models) => (this.model = models)
    );
    if (this.model !== undefined || this.model !== null) {
      this.getRFTReportDetail();
      this.getAVG();
    }
  }

  getRFTReportDetail() {
    this.rftReportService.searchRFTReportDetail(this.model).subscribe((res) => {
      this.rftreportdetails = res;
    });
  }

  getAVG() {
    this.rftReportService
      .getAverage(this.model.factory_id, this.model.model_no)
      .subscribe((res) => {
        this.avgdata = res;
        this.cr2 = this.avgdata.rftavg.cR2;
        this.sms = this.avgdata.rftavg.sms;
        this.cs1 = this.avgdata.rftavg.cS1;
        this.cs2 = this.avgdata.rftavg.cS2;
        this.cs3 = this.avgdata.rftavg.cS3;
        this.prod1 = this.avgdata.rftavg.proD1;
        this.prod2 = this.avgdata.rftavg.proD2;
        this.mp1 = this.avgdata.rftavg.mP1;
        this.mp2 = this.avgdata.rftavg.mP2;
        this.mp3 = this.avgdata.rftavg.mP3;
        this.totalavg =
          this.avgdata.totalavg !== null
            ? this.avgdata.totalavg.toFixed(2)
            : this.avgdata.totalavg;
      });
  }

  backList() {
    this.router.navigate(["./report/group-rft-report/main"]);
  }
}
