import { ModelStore } from './../_stores/model.store';
import { QueryEntity } from '@datorama/akita';
import { ModelState } from '../_stores/model.store';
import { Injectable } from '@angular/core';

@Injectable({  providedIn: 'root'})
export class ModelQuery extends QueryEntity<ModelState> {
  constructor(protected store: ModelStore) {
    super(store);
  }
}
