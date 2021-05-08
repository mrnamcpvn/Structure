import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Pagination } from "../_models/pagination";
import { User } from "../_models/user";


export interface UserState extends EntityState<User, any> {
    pagination: Pagination;                //khai báo các biến phụ thuộc
    listRoleByUser: any[]
}

export function createInitialState(): UserState {
    return {
        pagination: {} as Pagination,                  //khởi tạo giá trị cho biến
        listRoleByUser: []
    }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: "user", idKey: '_id', deepFreezeFn: obj => obj }) //in dev mode, we deep freeze the store, so that you don't mutate it => temporary solution : deepFreezeFn: obj => obj
export class UserStore extends EntityStore<UserState> {
    constructor() {
        super(createInitialState());        //khởi tạo
    }

    akitaPreAddEntity(newEntity: User): User & { _id: string; } {
        return {
            ...newEntity,
            _id: `${newEntity.account}`         //tạo khóa chính  cho entities
        }
    }

}