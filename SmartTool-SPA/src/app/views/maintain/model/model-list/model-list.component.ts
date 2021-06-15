import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Model } from '../../../../_core/_models/Model';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ModelService } from '../../../../_core/_services/model.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  models: Model[];
  model:any ={};
  paramSearch ={
    active: "all",
    model_search:""
  };
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems:1,
    totalPages:1,
  }
  noData: boolean =false;

  constructor(
    private spinner: NgxSpinnerService,
    private modelService: ModelService,
    private router: Router,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.data.subscribe((data) => {
      this.spinner.hide();
      this.models = data["models"].result;
      this.pagination = data["models"].pagination;
    });
    this.spinner.hide();
  }

  //loadData
  loadeMd(){
    this.spinner.show();
    this.noData = false;
    this.paramSearch.model_search = this.paramSearch.model_search.toUpperCase();
    this.modelService
      .searchMd(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.paramSearch
      )
      .subscribe(
        (res: PaginatedResult<Model[]>) => {
          this.models = res.result;
          this.pagination = res.pagination;
          if (this.models.length == 0) {
            this.noData = true;
          }
          this.spinner.hide();
        },
        (error) => {
          this.alertify.error("List Model failed loading data");
        }
      );
  }
}
