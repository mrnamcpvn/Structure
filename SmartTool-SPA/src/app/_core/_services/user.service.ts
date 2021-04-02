import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OperationResult } from '../_models/operation-result';
import { PaginatedResult } from '../_models/pagination';
import { RoleByUser } from '../_models/role-by-user';
import { AddUser, User } from '../_models/user';
import { UserStore } from '../_stores/user.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userStore: UserStore,
    ) { }

  getUsers(account: string, isActive: string, page?, itemsPerPage?) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    isActive = isActive === 'all' ? '' : isActive;
    return this.http.get<User[]>(this.baseUrl + 'user/list?account=' + account + '&isActive=' + isActive, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  addUser(addUser: AddUser) {
    return this.http.post(`${this.baseUrl}User/add`, addUser).pipe(
      tap(user => {
        this.userStore.update(user);
      })
    );
  }

  updateUser(updateUser: AddUser) {
    return this.http.post(`${this.baseUrl}User/update`, updateUser).pipe(
      tap(user => {
        this.userStore.update(user);
      })
    );
  }

  getRoleByUser(account: string) {
    return this.http.get<RoleByUser[]>(`${this.baseUrl}User/roleuser/` + account).pipe(
      tap(roleUser => {
        this.userStore.update({listRoleByUser: roleUser});
      })
    );
  }

  updateRoleByUser(account: string, listRoleByUser: RoleByUser[]) {
    return this.http.post(`${this.baseUrl}User/roleuser/` + account, listRoleByUser).pipe(
      tap(updateRole => {
        this.userStore.update(updateRole);
      })
    );
  }

  changePassword(account: string, oldPassword: string, password: string) {
    const user = {
      Account: account,
      OldPassword: oldPassword,
      Password: password
    };
    return this.http.post<OperationResult>(this.baseUrl + 'User/changepassword', user);
  }
}
