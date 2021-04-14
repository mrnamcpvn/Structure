import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Model } from "../../../../_core/_models/model";
import {
  PaginatedResult,
  Pagination,
} from "../../../../_core/_models/pagination";
import { Users } from "../../../../_core/_models/users";
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
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.models = data["models"].result;
      this.pagination = data["models"].pagination;
    });
  }
  loadData() {
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
        },
        (error) => {
          this.alertify.error("List Model failed loading data");
        }
      );
  }
  search() {
    this.pagination.currentPage = 1;
    this.loadData();
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
}
