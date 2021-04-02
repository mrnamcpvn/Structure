import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ModelKaizenReport } from '../../../../_core/_models/model-kaizen-report';
import { Pagination } from '../../../../_core/_models/pagination';
import { KaizenReportQuery } from '../../../../_core/_queries/kaizen-report.query';
import { KaizenReportService } from '../../../../_core/_services/kaizen-report.service';
import { FunctionUtility } from '../../../../_core/_utility/function-utility';

@Component({
  selector: 'app-kaizen-list',
  templateUrl: './kaizen-list.component.html',
  styleUrls: ['./kaizen-list.component.scss']
})
export class KaizenListComponent implements OnInit {
  models: ModelKaizenReport[] = [];
  model_no: string = '';
  active: string = 'all';
  filterParam: any;
  subscription: Subscription = new Subscription();
  alerts: any = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };
  constructor(private kaizenService: KaizenReportService,
              private spinnerService: NgxSpinnerService,
              private router: Router,
              private utility: FunctionUtility,
              private kaizenReportQuery: KaizenReportQuery
              ) { }

  ngOnInit() {
    this.queryKaizenReport();
  }

  queryKaizenReport() {
    this.subscription.add(
      this.kaizenReportQuery.selectAll().subscribe(models => this.models = models)
    );
  }

  getData() {
    this.filterParam = {
      model_No: this.model_no.toUpperCase(),
      active: this.active
    };
    this.spinnerService.show();
    this.kaizenService.search(this.pagination.currentPage , this.pagination.itemsPerPage, this.filterParam).subscribe(res => {
      this.spinnerService.hide();
      this.models = res.result;
      this.models.map(obj => {
        obj.volume_string = this.utility.convertNumber(obj.volume);
        return obj;
      });
      this.pagination = res.pagination;
    });
  }

  search() {
    this.pagination.currentPage = 1;
    this.getData();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getData();
  }

  modelDetail(model: ModelKaizenReport) {
    this.kaizenService.changeModel(model);
    this.router.navigate(['/report/kaizen-report/model-detail']);
  }

  buildParram() {
    this.filterParam = {
      model_No: this.model_no,
      active: this.active
    };
  }
  exportExcel() {
    this.filterParam = {
      model_No: this.model_no.toUpperCase(),
      active: this.active
    };
    this.kaizenService.exportExcel(this.filterParam);
  }
  clear() {
    this.models.length = 0;
    this.model_no = '';
    this.active = 'all';
  }

}
