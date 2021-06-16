import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from '../_models/model';
import { AlertifyService } from '../_services/alertify.service';
import { ModelService } from '../_services/model.service';

@Injectable({
  providedIn: 'root'
})
export class ModelResolver implements Resolve<Model[]> {
  pageNumber = 1;
  pageSize = 10;
  modelParam = {};
  constructor(private modeService: ModelService, private router: Router, private alertify: AlertifyService){}
  resolve(route: ActivatedRouteSnapshot): Observable<Model[]> {
    return this.modeService.searchMd(this.pageNumber, this.pageSize, this.modelParam).pipe(
      catchError(error => {
        this.alertify.error("....data not found");
        this.router.navigate(['/dashboard']);
        return of(null);
      })
    );
    
  }
}
