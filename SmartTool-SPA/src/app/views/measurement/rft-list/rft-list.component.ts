import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { MeasumentRFT } from '../../../_core/_models/MeasumentRFT';
import { Pagination } from '../../../_core/_models/pagination';
import { RftService } from '../../../_core/_services/rft.service';

@Component({
  selector: 'app-rft-list',
  templateUrl: './rft-list.component.html',
  styleUrls: ['./rft-list.component.scss']
})
export class RftListComponent implements OnInit {
  
  listdataModelNo: any;
  listStage: Array<Select2OptionData>;
  listModelNo: Array<Select2OptionData>;
  modelNo: string ='';
  stage: string = '';
  upperIDD: string ="";
  modelNamee: string = "";
  conditionFlag: boolean =false;
  isAddNew: boolean = true;
  rft: any = {};
  rftcondition: any = {};
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  dataMesuar: MeasumentRFT[] = [];

  constructor(
    private _rftService: RftService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getListModelNo();
    this.getListStage();
  }

  getListModelNo() {
    this._rftService.geDataModelNo().subscribe((res) => {
      this.listdataModelNo = res;
      this.listModelNo = res.map((item) => {
        return { id: item.model_no, text: item.model_no };
      });
    });
  }

  getListStage() {
    this._rftService.geDataStage().subscribe((res) => {
      this.listStage = res.map((item) => {
        return { id: item.stage_id, text: item.stage_name };
      });
    });
  }
  changeStage(event) {
    this.getData();
    this.addNewIsNull();
  }

  getData(currentPage = 1) {
    this._rftService
      .search(currentPage, this.modelNo, this.stage)
      .subscribe((res) => {
        this.pagination = res.pagination;
        this.dataMesuar = res.result;
      });
  }

  changeModelNo(event: any) {
    this.upperIDD = '';
    this.modelNamee = '';
    if (event != '') {
      this.upperIDD = this.listdataModelNo.find(x => x.model_no == event).upper_id;
      this.modelNamee = this.listdataModelNo.find(x => x.model_no == event).model_name;
      this.conditionFlag = true;
    }
    
    this.addNewIsNull();
  }
  addNewIsNull() {
    this._rftService
      .getProcessType(this.modelNo, this.stage)
      .subscribe((res) => {
        // console.log(res);
        if (res.length === 0) {
          this.isAddNew = false;
        } else {
          this.isAddNew = true;
        }
      });
  }

  addRFT() {
    this.rft = {};
    this.rftcondition = {
      modelNo: this.modelNo,
      modelName: this.modelNamee,
      upperID: this.upperIDD,
      stage: this.stage,
    };
    this._rftService.getRFTCondition(this.rftcondition);
    this._rftService.changeRFT(this.rft);
    this.router.navigate(["./measurement/add"]);
  }

}
