import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Model } from "../_models/model";
import { AlertifyService } from "../_services/alertify.service";
import { ModelService } from "../_services/model.service";
import { PaginatedResult, Pagination } from "../_models/pagination";
@Injectable()
export class ModelResolver implements Resolve<Model[]> {
  pagination: Pagination = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  };
  pageNumber = 1;
  pageSize = 10;
  modelParam: any = { active: "all", model_search: "" };
  constructor(
    private modelService: ModelService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Model[]> {
    return this.modelService.searchModel(this.pagination, this.modelParam).pipe(
      catchError((error) => {
        this.alertify.error("Problem retrieving data");
        this.router.navigate(["/dashboard"]);
        return of(null);
      })
    );
  }
}
