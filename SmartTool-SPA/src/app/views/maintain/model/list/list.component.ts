import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "../../../../_core/_model/pagination";
import { ModelsQuery } from "../../../../_core/_queries/model.query";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelsStore } from "../../../../_core/_stores/model.stores";
import { Model } from "./../../../../_core/_model/model";
import { ModelService } from "./../../../../_core/_services/model.service";
@UntilDestroy()
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  models: Model[];
  model: any = {};
  noData: boolean = false;
  activeList: Array<Select2OptionData>;
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
    private spinner: NgxSpinnerService,
    private modelsQuery: ModelsQuery,
    private modelsStore: ModelsStore
  ) {}

  ngOnInit() {
    // this.loadData();
    // this.spinner.show();
    // this.route.data.subscribe((data) => {
    //   this.spinner.hide();
    //   this.models = data["models"].result;
    //   this.pagination = data["models"].pagination;
    // });
    // this.spinner.hide();
    this.modelsQuery
      .selectAll()
      .pipe(untilDestroyed(this))
      .subscribe((models) => (this.models = models));
    this.modelsQuery
      .select((state) => state.pagination)
      .pipe(untilDestroyed(this))
      .subscribe((pagination) => (this.pagination = pagination));

    this.loadData();
  }

  // loadData() {
  //   this.spinner.show();
  //   this.noData = false;
  //   this.paramSearch.model_search = this.paramSearch.model_search.toUpperCase();
  //   this.ModelService.search(
  //     this.pagination.currentPage,
  //     this.pagination.itemsPerPage,
  //     this.paramSearch
  //   ).subscribe(
  //     (res: PaginatedResult<Model[]>) => {
  //       this.models = res.result;
  //       this.pagination = res.pagination;
  //       if (this.models.length === 0) {
  //         this.noData = true;
  //       }
  //       this.spinner.hide();
  //     },
  //     (error) => {
  //       this.alertify.error("List Model failed loading data");
  //     }
  //   );
  // }
  loadData() {
    this.modelService
      .searchAkita(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.paramSearch
      )
      .subscribe();
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

  updateModel(_id) {
    this.modelsStore.setActive(_id);
    this.router.navigate(["/maintain/model/edit/"]);
  }
}
