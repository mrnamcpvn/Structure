import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
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
  activeList: Array<Select2OptionData>;
  noData: boolean = false;
  paramSearch = {
    active: "all",
    model_search: "",
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
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.data.subscribe((data) => {
      this.spinner.hide();
      this.models = data["models"].result;
      this.pagination = data["models"].pagination;
    });
    this.spinner.hide();
  }

  loadData() {
    this.spinner.show();
    this.noData = false;
    this.paramSearch.model_search = this.paramSearch.model_search.toUpperCase();
    this.modelService
      .search(
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

  search() {
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadData();
    this.spinner.hide();
  }

  clear() {
    this.paramSearch.active = "all";
    this.paramSearch.model_search = "";
    this.loadData();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  addModel() {
    this.router.navigate(["/maintain/model/add"]);
  }

  updateModel(modelNo) {
    this.router.navigate(["/maintain/model/edit/" + modelNo]);
  }

  deleteModel(item: Model) {
    this.alertify.confirm(
      "Delete Model",
      "Are you sure you want to delete this Model ?",
      () => {
        this.modelService.deleteModel(item).subscribe(
          () => {
            this.loadData();
            this.alertify.success("Model has been deleted");
          },
          (error) => {
            this.alertify.error("This Model is already in use");
          }
        );
      }
    );
  }
}
