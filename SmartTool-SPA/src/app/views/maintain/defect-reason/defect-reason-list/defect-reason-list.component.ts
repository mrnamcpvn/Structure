import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { DefectReason } from '../../../../_core/_models/defect-reason';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';

@Component({
  selector: 'app-defect-reason-list',
  templateUrl: './defect-reason-list.component.html',
  styleUrls: ['./defect-reason-list.component.scss']
})
export class DefectReasonListComponent implements OnInit {
  paramSearch: any = {};
  defectreasons: DefectReason[];
  defectreason: any = {};
  pagination : Pagination ={currentPage:1, itemsPerPage:10,totalItems:1,totalPages:1};

  constructor( private defectreasonService: DefectReasonService,
                private spinner: NgxSpinnerService,
                private alertify: AlertifyService,
                private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.paramSearch.active ='all';
    this.paramSearch.defect_reason ="";
    this.loadData();
    this.spinner.hide();
  }


  //load data
  loadData(){
    this.defectreasonService
    .getdr( this.pagination.currentPage,
              this.pagination.itemsPerPage, this.paramSearch)
    .subscribe((res : PaginatedResult<DefectReason[]>) =>{
      this.defectreasons = res.result;
      this.pagination = res.pagination;
      this.spinner.hide();
    }, error =>{
      this.alertify.error(error);
    })
  }

  searchDr(){
    this.spinner.show();
    this.pagination.currentPage =1;
    this.loadData();
    this.spinner.hide();
  }

  clearDr(){
    this.paramSearch.defect_Reason ='';
    this.paramSearch.active ='all';
    this.loadData();
  }

  pageChanged(event : any): void{
    debugger
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  addNew(){
    this.defectreason ={};
    this.defectreasonService.adddr(this.defectreason);
    this.defectreasonService.changeFlag("0");
    this.router.navigate(["/maintain/defect-reason/add"]);
  }

  edit(defactreason: DefectReason){
    localStorage.setItem('defactreasonSmartTooling', JSON.stringify(defactreason));
    this.router.navigate(["/maintain/defect-reason/edit"]);
  }
}
