import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Model } from "../_model/model";
import { Pagination } from "../_model/pagination";

export interface ModelsState extends EntityState<Model, string> {
  pagination: Pagination;
  modelTypes: any[];
}

export function createInitialState(): ModelsState {
  return {
    pagination: {} as Pagination,
    modelTypes: [],
  };
}
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "models", idKey: "_id", deepFreezeFn: (obj) => obj })
export class ModelsStore extends EntityStore<ModelsState> {
  constructor() {
    super(createInitialState());
  }

  akitaPreAddEntity(newEntity: Model): Model & { _id: string } {
    return {
      ...newEntity,
      _id: newEntity.factory_id + "_" + newEntity.model_no,
    };
  }
}
