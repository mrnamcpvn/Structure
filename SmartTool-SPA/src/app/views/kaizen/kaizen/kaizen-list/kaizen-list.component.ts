import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Kaizen } from '../../../../_core/_models/kaizen';
import { Pagination } from '../../../../_core/_models/pagination';
import { KaizenService } from '../../../../_core/_services/kaizen.service';

@Component({
  selector: 'app-kaizen-list',
  templateUrl: './kaizen-list.component.html',
  styleUrls: ['./kaizen-list.component.scss']
})
export class KaizenListComponent implements OnInit {

  listdataModelNo :any;
  modelNo: string = '';
  upperID: string = '';
  modelName:string='';
  checkAddnew:boolean= false;
  listModelNo: Array<Select2OptionData>;
  pagination: Pagination ={
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  dataKaizen: Kaizen[] = []; 

  constructor(
    private kaizenService: KaizenService,
    private spinner: NgxSpinnerService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getListModelNo();
  }
  getListModelNo() {
    this.kaizenService.geDataModelNo().subscribe(res => {
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

  getData(){
    this.spinner.show();
    this.kaizenService.search(this.pagination.currentPage, this.modelNo).subscribe(res => {
      this.pagination = res.pagination;
      this.dataKaizen = res.result;
      this.spinner.hide();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  addNew(){
    this.kaizenService.changeModel(this.modelNo,this.modelName)
    this.router.navigate(['/kaizen/kaizen-add']);
  }
  edit(item){
    this.router.navigate(['/kaizen/kaizen-edit/'+item.model_no+"/"+item.serial_no]);
  }
}
