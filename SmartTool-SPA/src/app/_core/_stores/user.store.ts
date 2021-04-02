import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Pagination } from '../_models/pagination';
import { RoleByUser } from '../_models/role-by-user';

export interface UserState extends EntityState<User, number> {
  pagination: Pagination;
  listRoleByUser: RoleByUser[];
}

export function createInitialState(): UserState {
  return {
    pagination: {} as Pagination,
    listRoleByUser: []
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super(createInitialState());
  }
}
