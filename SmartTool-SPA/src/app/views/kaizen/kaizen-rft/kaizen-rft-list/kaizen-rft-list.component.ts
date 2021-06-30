import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Kaizen } from '../../../../_core/_models/kaizen';
import { Pagination } from '../../../../_core/_models/pagination';
import { KaizenService } from '../../../../_core/_services/kaizen.service';

@Component({
  selector: 'app-kaizen-rft-list',
  templateUrl: './kaizen-rft-list.component.html',
  styleUrls: ['./kaizen-rft-list.component.scss']
})
export class KaizenRftListComponent implements OnInit {

  listModelNo: Array<Select2OptionData>;
  listdataModelNo: any;
  modelNo: string = '';
  upperID: string = '';
  modelName:string='';
  dataKaizen: Kaizen[] = []; 
  checkAddnew:boolean= false;
  pagination: Pagination = {
    currentPage: 1,
    totalPage: 1,
    pageSize: 10,
    totalCount: 1,

  };
  constructor(
    private _kaizenService: KaizenService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getListModelNo();
  }


  getListModelNo() {
    this._kaizenService.geDataModelNo().subscribe(res => {
      this.listdataModelNo = res;
      this.listModelNo = res.map(item => {
        return { id: item.model_no, text: item.model_no };
      })
    })
  }
  changeModelNo(event: any) {
    this.upperID = '';
    this.modelName = '';
    if (event != '') {
      this.upperID = this.listdataModelNo.find(x => x.model_no == event).upper_id;
      this.modelName = this.listdataModelNo.find(x => x.model_no == event).model_name;
      this.checkAddnew = true;
    }
    else
    {
      this.checkAddnew = false;
    }
    this.getData();
  }

  getData() {
    this.spinner.show();
    this._kaizenService.search(this.pagination.currentPage, this.modelNo).subscribe(res => {
      this.pagination = res.pagination;
      this.dataKaizen = res.result;
      this.spinner.hide();
    })
  }
  pageChanged(event) {
    this.pagination.currentPage = event.page;
    this.getData();
  }

  edit(kaizen){
    this.router.navigate(['/kaizen/kaizen-rft/kaizen-rft-edit/'+kaizen.model_no+"/"+kaizen.serial_no]);
  }
  

}
