import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Resolver } from 'node:dns';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from '../_models/model';
import { AlertifyService } from '../_services/alertify.service';
import { ModelService } from '../_services/model.service';

@Injectable()
export class ModelEditResolver implements Resolve<Model> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Model | Observable<Model> | Promise<Model> {
    throw new Error('Method not implemented.');
  }
}
