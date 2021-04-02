import { AlertUtilityService } from './../../../../_core/_services/alertUtility.service';
import { Component, OnInit } from '@angular/core';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { RFTReport } from '../../../../_core/_models/rft-report';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { RFTReportService } from '../../../../_core/_services/rft-report.service';
import { RFTReportQuery } from '../../../../_core/_queries/rft-report.query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rft-list',
  templateUrl: './rft-list.component.html',
  styleUrls: ['./rft-list.component.scss']
})
export class RftListComponent implements OnInit {
  rftReports: RFTReport[] = [];
  paramSearch: any = {};
  model_no: string = '';
  subscription: Subscription = new Subscription();
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private rftreportService: RFTReportService,
    private alertify: AlertUtilityService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private rftReportQuery: RFTReportQuery
  ) {}

  ngOnInit() {
    this.queryRFT();
    this.loadrftreports();
  }

  queryRFT() {
    this.subscription.add(
      this.rftReportQuery.selectAll().subscribe(rftReports => this.rftReports = rftReports)
    );
  }

  // load data, call api
  loadrftreports() {
    this.paramSearch = {
      factory_id: environment.factory,
      model_No: this.model_no.toUpperCase(),
    };
    this.spinner.show();
    this.rftreportService
      .searchRFTReport(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.paramSearch
      )
      .subscribe(
        (res: PaginatedResult<RFTReport[]>) => {
          this.rftReports = res.result;
          this.pagination = res.pagination;
          this.spinner.hide();
        },
        (error) => {
          this.alertify.error(error, 'Error');
        }
      );
  }

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadrftreports();
    this.spinner.hide();
  }

  // rft report detail
  detailRFTReport(model: RFTReport) {
    this.rftreportService.sendmodel(model);
    this.router.navigate(['/report/rft-report/rft-detail']);
  }

  // clear inputbox
  clearSearch() {
    this.model_no = '';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadrftreports();
  }

}
