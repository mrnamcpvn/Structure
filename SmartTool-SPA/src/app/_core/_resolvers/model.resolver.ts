import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from '../_models/model';
import { AlertUtilityService } from '../_services/alertUtility.service';
import { ModelService } from '../_services/model.service';

@Injectable()
export class ModelResolver implements  Resolve<Model[]> {
    pageNumber = 1;
    pageSize = 10;
    modelParam = {};
    constructor(private modelService: ModelService, private router: Router, private alertify: AlertUtilityService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Model[]> {
        return this.modelService.search(this.pageNumber, this.pageSize, this.modelParam).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data', 'Error');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }
}
