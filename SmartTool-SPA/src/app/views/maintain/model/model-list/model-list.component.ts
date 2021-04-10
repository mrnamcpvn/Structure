import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
//import { Select2OptionData } from "ng2-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { Model } from "../../../../_core/_models/model";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_models/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelService } from "../../../../_core/_services/model.service";




@Component({
  selector: "app-model-list",
  templateUrl: "./model-list.component.html",
  styleUrls: ["./model-list.component.scss"],
})
export class ModelListComponent implements OnInit {

  models: Model[];
  model: any = {};
  //activeList: Array<Select2OptionData>;
  noData: boolean = false;
  paramSearch = {
    active: "all",
    model_search: ""
  };
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private modelService: ModelService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.route.data.subscribe((data) => {
      this.spinner.hide();
      this.models = data["models"].result;
      this.pagination = data["models"].pagination;
    });
    this.spinner.hide();
  }

  LoadData() {
    this.spinner.show();
    this.noData = false;
    this.paramSearch.model_search = this.paramSearch.model_search.toUpperCase();
    this.modelService.search(
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.paramSearch
    ).subscribe(
      (res: PaginatedResult<Model[]>) => {
        this.models = res.result;
        this.pagination = res.pagination;
        if (this.models.length == 0) {
          this.noData = true;
        }
        this.spinner.hide();
      }, (error) => {
        this.alertify.error("List Model Faile Loading data");
      }
    )

  }
  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.LoadData();
    this.spinner.hide();
  }

  clear() {
    this.paramSearch.active = "all";
    this.paramSearch.model_search = "";
    this.LoadData();
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.LoadData();
  }


  addModel() {
    this.router.navigate(["/maintain/model/add"])

  }
  updateModel(modelNo) {
    this.router.navigate(["/maintain/model/edit/" + modelNo]);
  }


}
