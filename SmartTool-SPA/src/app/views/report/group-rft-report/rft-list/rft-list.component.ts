import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { Factory } from '../../../../_core/_models/factory';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { RFTReport } from '../../../../_core/_models/rft-report';
import { RFTReportService } from '../../../../_core/_services/rft-report.service';
import { CustomNgSnotifyService } from '../../../../_core/_services/snotify.service';

@Component({
  selector: 'app-rft-list',
  templateUrl: './rft-list.component.html',
  styleUrls: ['./rft-list.component.scss']
})
export class RftListComponent implements OnInit {
  rftreports: RFTReport[] = [];
  paramSearch: any = {};
  model_no: string = "";
  factories: Factory[];
  factory: string;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private rftReportService: RFTReportService,
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllFactory();
  }

  getAllFactory() {
    this.rftReportService.getAllFactory().subscribe(res => this.factories = res)
  }

  loadRftReport() {
    if (this.factory === undefined || this.factory === null)
      this.snotify.error("Please option factory");
    else {
      this.paramSearch = {
        factory_id: environment.factory,
        model_no: this.model_no.toUpperCase()
      };
      this.spinner.show();
      this.rftReportService.searchRFTReport(this.pagination.currentPage, this.pagination.itemsPerPage, this.paramSearch)
        .subscribe((res: PaginatedResult<RFTReport[]>) => {
          this.rftreports = res.result;
          this.pagination = res.pagination;
          this.spinner.hide();
        },
          (error) => this.snotify.error(error));
    }

  }

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadRftReport();
    this.spinner.hide();
  }

  detailRFTReport(model: RFTReport) {
    this.rftReportService.sendmodel(model);
    this.router.navigate(["/report/group-rft-report/rft-detail"]);
  }

  clearSearch() {
    // this.rftreports.length = 0;
    this.model_no = "";
    this.factory = null;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRftReport();
  }
}
