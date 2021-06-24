import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RFTReportDetail } from '../../../../_core/_models/rft-report-detail';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { AuthService } from '../../../../_core/_services/auth.service';
import { RftReportService } from '../../../../_core/_services/rft-report.service';

@Component({
  selector: 'app-rft-detail',
  templateUrl: './rft-detail.component.html',
  styleUrls: ['./rft-detail.component.scss']
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
    private rftReportService: RftReportService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    
   }

  ngOnInit(): void {
    this.spinner.show();
    // call by value(from model)
    this.rftReportService.currentModel.subscribe(
      (models) => (this.model = models)
    );
    console.log(this.model);
    if (this.model !== undefined || this.model !== null) {
      // console.log(this.model.model_no);
      this.getRFTReportDetail();
      this.getAVG();
    }
    this.spinner.hide();
  }

  getRFTReportDetail() {
    this.rftReportService.searchRFTReportDetail(this.model).subscribe((res) => {
      this.rftreportdetails = res;
      // console.log(res);
    });
  }

  getAVG() {
    this.rftReportService
      .getAverage(this.model.factory_id, this.model.model_no)
      .subscribe((res) => {
        this.avgdata = res;
        // console.log("AVG :", this.avgdata);
        // console.log("totalavg :", this.avgdata.totalavg);
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
        this.totalavg = this.avgdata.totalavg.toFixed(2);
      });
  }

  backList() {
    this.router.navigate(["./report/rft-report/list"]);
  }

}
