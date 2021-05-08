import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Select2OptionData } from "ng-select2";
import { Model } from '../../../../_core/_models/model';



import { ModelService } from '../../../../_core/_services/model.service';
import { Pagination } from '../../../../_core/_models/pagination';
import { CustomNgSnotifyService } from '../../../../_core/_services/snotify.service';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ModelQuery } from '../../../../_core/_queries/model.query';
import { ModelStore } from '../../../../_core/_stores/model.store';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  models: Model[];
  activeList: Array<Select2OptionData>
  noData: boolean = false;
  isUpdateActivated = false;
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
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private modelService: ModelService,
    private modelQuery: ModelQuery,
    private modelStore: ModelStore,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    timer(1000).pipe(switchMap(() => this.modelService.getAll(this.pagination.currentPage, this.pagination.itemsPerPage, this.paramSearch))).subscribe();

    //create a "isloading" subscription
    this.modelQuery.selectLoading().pipe(takeUntil(this.unsubscribe$))
      .subscribe(isLoading => isLoading ? this.spinner.show() : this.spinner.hide());
    //create a 'entities' subscription
    this.modelQuery.selectAll().pipe(takeUntil(this.unsubscribe$))
      .subscribe(models => this.models = models);
    //Create a 'Pagination' subscription
    this.modelQuery.select(state => state.pagination)
      .subscribe(pagination => this.pagination = pagination);
  }

  addNew() {
    this.router.navigate(['/maintain/model/add']);
  }
  updateModel(_id: string) {
    this.modelStore.setActive(_id);
    this.router.navigate(['/maintain/model/edit']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  loadData() {
    this.modelService.getAll(this.pagination.currentPage, this.pagination.itemsPerPage, this.paramSearch).subscribe();
  }
  // loadData(){
  //   this.spinner.show();
  //   this.noData = false;
  //   this.paramSearch.model_search = this.paramSearch.model_search.toUpperCase();
  //   this.modelService.search(
  //     this.pagination.currentPage,
  //     this.pagination.itemsPerPage,
  //     this.paramSearch
  //   )
  //   .subscribe(
  //     (res: PaginatedResult<Model[]>) => {
  //       this.models = res.result;
  //       this.pagination = res.pagination;
  //       if(this.models.length == 0) {
  //         this.noData = true;
  //       }

  //       this.spinner.hide();
  //     },
  //     (error) => {
  //       this.snotifyService.error("List model failed loading data");
  //     }
  //   );
  // }

  clear() {
    this.paramSearch.active = "all";
    this.paramSearch.model_search = "";
    this.loadData();
  }

  pageChanged(event: any): void {
    // debugger;
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  search() {
    this.pagination.currentPage = 1;
    this.loadData();
  }

  // addModel() {
  //   this.router.navigate(["/maintain/model/add"]);
  // }
  // updateModel(modelNo) {
  //   this.router.navigate(["/maintain/model/edit/" + modelNo]);
  // }
}
