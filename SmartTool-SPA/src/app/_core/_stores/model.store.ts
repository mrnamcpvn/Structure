import { Model } from './../_models/model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Pagination } from '../_models/pagination';
import { Injectable } from '@angular/core';

export interface ModelState extends EntityState<Model, any> {
  pagination: Pagination;
}

@Injectable({  providedIn: 'root'})
@StoreConfig({ name: 'modelStore', idKey: '_id' })
export class ModelStore extends EntityStore<ModelState> {
  constructor() {
    super({
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
      } as Pagination,
    });
  }

  akitaPreAddEntity(newEntity: Model): Model & { _id: string; } {
    return {
      ...newEntity,
      _id: `${newEntity.factory_id}_${newEntity.model_no}` ,
    };
  }
}
