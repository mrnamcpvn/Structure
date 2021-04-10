import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from '../_models/model';
import { AlertifyService } from '../_services/alertify.service';
import { ModelService } from '../../_core/_services/model.service';

@Injectable()
export class ModelEditResolver implements Resolve<Model> {

    constructor(private modelService: ModelService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Model> {
        const modelNo = route.paramMap.get('modelNo');
        return this.modelService.getModelNoEdit(modelNo).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/category']);
                return of(null);
            }),
        );
    }
}