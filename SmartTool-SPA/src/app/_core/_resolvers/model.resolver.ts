import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from '../_models/model';
import { ModelService } from '../_services/model.service';
import { CustomNgSnotifyService } from '../_services/snotify.service';



@Injectable()
export class ModelResolver implements Resolve<Model[]> { 
    pageNumber = 1;
    pageSize = 10;
    modelParam = {};
    /**
     *
     */
    constructor(
        private modelService: ModelService, 
        private router: Router, private snotifyService  : CustomNgSnotifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Model[]>{
        return this.modelService.search(this.pageNumber,this.pageSize, this.modelParam).pipe(
            catchError(error => {
                this.snotifyService.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        )
    }
}
