import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ModelOperationState, ModelOperationStore } from '../_stores/model-operation.store';


@Injectable({ providedIn: 'root' })
export class ModelOperationQuery extends QueryEntity<ModelOperationState> {
    constructor(protected store: ModelOperationStore) {
        super(store);
    }
}