import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Model } from "../_models/model";
import { AlertifyService } from "../_services/alertify.service";
import { ModelOperationService } from "../_services/model-operation.service";
import { ModelService } from "../_services/model.service";

@Injectable()
export class ModelOperationResolver implements Resolve<Model[]> {
  pageNumber = 1;
  pageSize = 10;
  constructor(
    private modelOperationService: ModelOperationService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Model[]> {
    return this.modelOperationService
      .getOperationData(this.pageNumber, this.pageSize)
      .pipe(
        catchError((error) => {
          this.alertify.error("Problem retrieving data");
          this.router.navigate(["/dashboard"]);
          return of(null);
        })
      );
  }
}
