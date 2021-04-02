import { AlertUtilityService } from './../../../../_core/_services/alertUtility.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { RFTReport } from '../../../../_core/_models/rft-report';
import { RFTReportService } from '../../../../_core/_services/rft-report.service';
import { Factory } from '../../../../_core/_models/factory';
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
  factories: Factory[];
  factory: string;
  subscription: Subscription = new Subscription();
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };

  constructor(
    private rftReportService: RFTReportService,
    private alertify: AlertUtilityService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private rftReportQuery: RFTReportQuery
  ) {}

  ngOnInit() {
    this.query();
    this.getAllFactory();
  }

  query() {
    this.subscription.add(
      this.rftReportQuery.selectAll().subscribe(rftReports => this.rftReports = rftReports)
    );
  }

  getAllFactory() {
    this.rftReportService.getAllFactory().subscribe((res) => {
      this.factories = res;
    });
  }

  // load data, call api
  loadrftreports() {
    if (this.factory === undefined || this.factory === null) {
      this.alertify.error('Please option factory', 'Error');
    } else {
      this.paramSearch = {
        factory_id: this.factory,
        model_No: this.model_no.toUpperCase(),
      };
      this.spinner.show();
      this.rftReportService
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
  }

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadrftreports();
    this.spinner.hide();
  }

  // rft report detail
  detailRFTReport(model: RFTReport) {
    this.rftReportService.sendmodel(model);
    this.router.navigate(['/report/group-rft-report/rft-detail']);
  }

  // clear inputbox
  clearSearch() {
    this.model_no = '';
    this.factory = null;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadrftreports();
  }

}
