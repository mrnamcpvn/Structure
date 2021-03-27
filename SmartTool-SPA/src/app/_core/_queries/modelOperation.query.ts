import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ModelOperationState, ModelOperationStore } from '../_stores/modelOperation.store';

@Injectable({  providedIn: 'root'})
export class ModelOperationQuery extends QueryEntity<ModelOperationState> {
  constructor(protected store: ModelOperationStore) {
    super(store);
  }
}
