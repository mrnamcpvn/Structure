import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  models: Model[] = [];
  model: any = {};
  noData: boolean = false;
  paramSearch = {
    active: "all",
    model_search: "",
  };
  pagination: Pagination = {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageSize: 10,
    skip: 0,
  };
  constructor(
    private modelService: ModelService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data.subscribe((data) => {
        console.log("Test", data["models"]);
        this.models = data["models"].result;
        this.pagination = data["models"].pagination;
        console.log(this.pagination);
      });
      let result = 0;
      const text1 = "aA";
      const text2 = "aaAdAsadsad";
      console.log(text2.includes(text1));
      for (let i = 0; i < text1.length; i++) {
        const character = text1.charAt(i);
        for (let i2 = 0; i2 < text2.length; i2++) {
          const character2 = text2.charAt(i2);
          if (character == character2) result++;
        }
      }
      console.log(result);
    });
  }
  loadData() {
    this.noData = false;
    this.paramSearch.model_search = this.paramSearch.model_search.toUpperCase();
    this.modelService
      .searchModel(this.pagination, this.paramSearch)
      .subscribe((result) => {
        this.models = result.result;
        this.pagination = result.pagination;
        console.log(this.pagination);
      });
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
    this.pagination.currentPage = event.page === undefined ? 1 : event.page;
    this.loadData();
  }
  addModel() {
    this.router.navigate(["/maintain/model/add"]);
  }

  updateModel(modelNo) {
    this.router.navigate(["/maintain/model/edit/" + modelNo]);
  }
}
