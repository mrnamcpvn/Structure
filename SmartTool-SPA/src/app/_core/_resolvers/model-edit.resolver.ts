import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from '../_models/model';
import { ModelService } from '../_services/model.service';
import { CustomNgSnotifyService } from '../_services/snotify.service';


@Injectable()
export class ModelEditResolver implements Resolve<Model> {
    constructor(private modelService: ModelService, private router: Router, private snotify: CustomNgSnotifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Model> {
        const modelNo = route.paramMap.get('modelNo');
        // return this.modelService.getModelNoEdit(modelNo).pipe(
        //     catchError(error => {
        //         this.snotify.error('Problem retrieving data');
        //         this.router.navigate(['/category']);
        //         return of(null);
        //     })
        // )
        return null;
    }
}