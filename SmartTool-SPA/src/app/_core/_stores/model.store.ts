import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Model } from '../_models/model';
import { Pagination } from '../_models/pagination';

export interface ModelState extends EntityState<Model, any> {
    modelTypes: any[];                //khai báo các biến phụ thuộc (tái sử dụng)
    pagination: Pagination;
}

export function createInitialState(): ModelState {
    return {
        modelTypes: [],                 //khởi tạo giá trị cho biến
        pagination: {} as Pagination
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: "model", idKey: '_id', deepFreezeFn: obj => obj })  //in dev mode, we deep freeze the store, so that you don't mutate it => temporary solution : deepFreezeFn: obj => obj
export class ModelStore extends EntityStore<ModelState> {
    constructor() {
        super(createInitialState());        //khởi tạo
    }

    akitaPreAddEntity(newEntity: Model): Model & { _id: string; } {
        return {
            ...newEntity,
            _id: `${newEntity.factory_id}_${newEntity.model_no}`,         //tạo khóa chính  cho entities
        };
    }
}



