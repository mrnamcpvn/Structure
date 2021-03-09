import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Resolver } from 'node:dns';
import { Observable } from 'rxjs';
import { Model } from '../_models/model';

@Injectable()
export class ModelEditResolver implements Resolve<Model> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Model | Observable<Model> | Promise<Model> {
    throw new Error('Method not implemented.');
  }
}
