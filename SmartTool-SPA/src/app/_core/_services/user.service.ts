import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OperationResult } from '../_models/operation-result';
import { PaginatedResult } from '../_models/pagination';
import { RoleByUser } from '../_models/role-by-user';
import { User } from '../_models/user';
import { UserStore } from '../_stores/user.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userStore: UserStore) { }

  getUsers(account: string, isActive: string, page?, itemsPerPage?) {

    let params = new HttpParams();
    params = params.append('account', account);
    isActive = isActive == 'all' ? '' : isActive;
    params = params.append('isActive', isActive);
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<any>(this.baseUrl + 'User', { observe: 'response', params })
      .pipe(map(response => {
        this.userStore.update({ pagination: JSON.parse(response.headers.get("Pagination")) });
        this.userStore.set(response.body);
      }));

  }

  addUser(user: User) {
    return this.http.post<OperationResult>(this.baseUrl + 'User', user).pipe(
      tap(res => { if (res.success) this.userStore.add(user) }));
  }

  updateUser(updateUser: User) {
    return this.http.post<OperationResult>(this.baseUrl + 'User/update', updateUser).pipe(
      tap(res => { if (res.success) this.userStore.update(updateUser._id, updateUser) }));
  }

  getRoleByUser(account: string) {
    return this.http.get<RoleByUser[]>(this.baseUrl + 'User/roleuser/' + account);
  }

  updateRoleByUser(account: string, listRoleByUser: RoleByUser[], update_by: string) {
    let params = new HttpParams();
    params = params.append("update_by", update_by);
    return this.http.post<OperationResult>(this.baseUrl + 'User/roleuser/' + account, listRoleByUser, { params }).pipe(
      tap(res => { if (res.success) this.userStore.update({ listRoleByUser }) }));
  }

  changePassword(account: string, oldPassword: string, password: string) {
    const user = {
      Account: account,
      OldPassword: oldPassword,
      Password: password
    };
    return this.http.post<OperationResult>(this.baseUrl + 'User/changepassword', user);
  }

  // getUsers(account: string, isActive: string, page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
  //   const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  //   let params = new HttpParams();

  //   if (page != null && itemsPerPage != null) {
  //     params = params.append('pageNumber', page);
  //     params = params.append('pageSize', itemsPerPage);
  //   }
  //   isActive = isActive === 'all' ? '' : isActive;
  //   return this.http.get<any>(this.baseUrl + 'user?account=' + account + '&isActive=' + isActive, { observe: 'response', params })
  //     .pipe(
  //       map(response => {
  //         paginatedResult.result = response.body;
  //         if (response.headers.get('Pagination') != null) {
  //           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
  //         }
  //         return paginatedResult;
  //       }),
  //     );
  // }
}
