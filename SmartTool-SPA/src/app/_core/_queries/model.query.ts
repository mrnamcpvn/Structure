import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ModelsState, ModelsStore } from "../_stores/model.stores";

@Injectable({ providedIn: "root" })
export class ModelsQuery extends QueryEntity<ModelsState> {
  constructor(protected store: ModelsStore) {
    super(store);
  }
}
