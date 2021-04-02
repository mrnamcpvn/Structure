import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RFTReportService } from '../../../../_core/_services/rft-report.service';
import { RFTReportDetail } from '../../../../_core/_models/rft-report-detail';
import { RFTReportQuery } from '../../../../_core/_queries/rft-report.query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rft-detail',
  templateUrl: './rft-detail.component.html',
  styleUrls: ['./rft-detail.component.scss']
})
export class RftDetailComponent implements OnInit {
  rftReportDetail: RFTReportDetail = {} as RFTReportDetail;
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
  subscription: Subscription = new Subscription();

  constructor(
    private rftReportService: RFTReportService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private rftReportQuery: RFTReportQuery,
  ) {}

  ngOnInit() {
    this.query();
    this.spinner.show();
    // call by value(from model)
    this.rftReportService.currentModel.subscribe((models) => (this.model = models));

    if (this.model !== undefined || this.model !== null) {
      this.getRFTReportDetail();
      this.getAVG();
    }
    this.spinner.hide();
  }

  query() {
    this.subscription.add(
      this.rftReportQuery.select(state => state.rftReportDetail).subscribe(rftReportDetail => this.rftReportDetail = rftReportDetail)
    );
  }

  getRFTReportDetail() {
    this.rftReportService.searchRFTReportDetail(this.model).subscribe((res) => {
      this.rftReportDetail = res;
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
        this.totalavg = this.avgdata.totalavg.toFixed(2);
      });
  }

  backList() {
    this.router.navigate(['./report/rft-report']);
  }

}
