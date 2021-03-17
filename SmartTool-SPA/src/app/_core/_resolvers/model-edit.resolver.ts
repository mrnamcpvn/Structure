import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from '../_models/model';
import { AlertUtilityService } from '../_services/alertUtility.service';
import { ModelService } from '../_services/model.service';

@Injectable()
export class ModelEditResolver implements Resolve<Model> {

  constructor(private modelService: ModelService, private router: Router, private alertify: AlertUtilityService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Model> {
        const modelNo = route.paramMap.get('modelNo');
        return this.modelService.getModelNoEdit(modelNo).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data', 'Error');
                this.router.navigate(['/category']);
                return of(null);
            }),
        );
    }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Model | Observable<Model> | Promise<Model> {
  //   throw new Error('Method not implemented.');
  // }
}
