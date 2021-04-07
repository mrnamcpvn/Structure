import { Router } from '@angular/router';
import { DefectReason } from './../../../../_core/_models/defect-reason';
import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';
import { AlertUtilityService } from '../../../../_core/_services/alertUtility.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-defect-reason-list',
  templateUrl: './defect-reason-list.component.html',
  styleUrls: ['./defect-reason-list.component.scss']
})
export class DefectReasonListComponent implements OnInit {
  defectReasons: DefectReason[];
  defectReason: any = {};
  activeList: Array<Select2OptionData>;
  paramSearch: any = {};
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1
  };

  constructor(
    private defectReasonService: DefectReasonService,
    private alertUtility: AlertUtilityService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.paramSearch.active = 'all';
    this.paramSearch.defect_Reason = '';
    this.loadDefectReasons();
    this.spinner.hide();
  }

  loadDefectReasons() {
    this.defectReasonService.search(
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.paramSearch
    ).subscribe((res: PaginatedResult<DefectReason[]>) => {
      this.defectReasons = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertUtility.error('error', 'Error');
    });
  }

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadDefectReasons();
    this.spinner.hide();
  }

  addDefectReason() {
    this.defectReason = {};
    this.defectReasonService.changeDefectReason(this.defectReason);
    this.defectReasonService.changeFlag('0');
    this.router.navigate(['/maintain/defect-reason/add']);
  }

  changeToEdit(defectReason: DefectReason) {
    this.defectReasonService.changeDefectReason(defectReason);
    this.defectReasonService.changeFlag('1');
    this.router.navigate(['/maintain/defect-reason/edit']);
  }

  clearSearch() {
    this.paramSearch = 'all';
    this.paramSearch.defect_Reason = '';
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadDefectReasons();
  }

}
