import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ModelState, ModelStore } from '../_stores/model.store';

@Injectable({ providedIn: 'root' })
export class ModelQuery extends QueryEntity<ModelState> {
    constructor(protected store: ModelStore) {
        super(store);
    }
}