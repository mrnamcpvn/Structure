import { Injectable } from "@angular/core";
import { enableAkitaProdMode, EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { environment } from "../../../environments/environment";
import { ModelOperation } from "../_models/model-operation";
import { Pagination } from "../_models/pagination";


export interface ModelOperationState extends EntityState<ModelOperation, any> {
    pagination: Pagination;                //khai báo các biến phụ thuộc
    stage: any[];
    modelNo: any[];
    processType: any[];
}

export function createInitialState(): ModelOperationState {
    return {
        pagination: {} as Pagination,                  //khởi tạo giá trị cho biến
        stage: [],
        modelNo: [],
        processType: [],
    }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: "model operation", idKey: '_id' }) //in dev mode, we deep freeze the store, so that you don't mutate it => temporary solution : deepFreezeFn: obj => obj
export class ModelOperationStore extends EntityStore<ModelOperationState> {
    constructor() {
        super(createInitialState());        //khởi tạo
        if (environment.production) {
            enableAkitaProdMode();
        }
    }

    akitaPreAddEntity(newEntity: ModelOperation): ModelOperation & { _id: string; } {
        return {
            ...newEntity,
            _id: `${newEntity.factory_id}_${newEntity.model_no}_${newEntity.stage_id}_${newEntity.operation_id}`         //tạo khóa chính  cho entities
        }
    }

}