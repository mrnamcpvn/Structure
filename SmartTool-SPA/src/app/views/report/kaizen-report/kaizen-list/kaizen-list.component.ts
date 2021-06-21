import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModelKaizenReport } from '../../../../_core/_models/model-kaizen-report';
import { Pagination } from '../../../../_core/_models/pagination';
import { KaizenReportService } from '../../../../_core/_services/kaizen-report.service';
import { FunctionUtility } from '../../../../_core/_utility/function-utility';

@Component({
  selector: 'app-kaizen-list',
  templateUrl: './kaizen-list.component.html',
  styleUrls: ['./kaizen-list.component.scss']
})
export class KaizenListComponent implements OnInit {


  filterParam: any;
  models: ModelKaizenReport[] =[];
  model_no: string = '';
  active: string = 'all';
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    totalPages: 0
  };
  constructor(
    private spinnerService: NgxSpinnerService,
    private kaizenService: KaizenReportService,
    private utility: FunctionUtility,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  getData() {
    this.filterParam = {
      model_No: this.model_no.toUpperCase(),
      active: this.active
    };
    this.spinnerService.show();
    this.kaizenService.search(this.pagination.currentPage , this.pagination.itemsPerPage,this.filterParam).subscribe(res => {
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

  clear(){
    this.model_no = '';
    this.active = 'all';
    this.models.length = 0;
  }

  exportExcel() {
    debugger
    this.filterParam = {
      model_No: this.model_no.toUpperCase(),
      active: this.active
    };
    this.kaizenService.exportExcel(this.filterParam);
  }

}
