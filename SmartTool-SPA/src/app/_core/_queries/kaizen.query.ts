import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { KaizenState, KaizenStore } from '../_stores/kaizen.store';

@Injectable({  providedIn: 'root'})
export class KaizenQuery extends QueryEntity<KaizenState> {
  constructor(protected store: KaizenStore) {
    super(store);
  }
}
