import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OperationResult } from '../_models/operation-result';
import { PaginatedResult } from '../_models/pagination';
import { RoleByUser } from '../_models/role-by-user';
import { AddUser } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(account: string, isActive: string, page?, itemsPerPage?): Observable<PaginatedResult<AddUser[]>> {
    const paginatedResult: PaginatedResult<AddUser[]> = new PaginatedResult<AddUser[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    isActive = isActive === 'all' ? '' : isActive;
    return this.http.get<any>(this.baseUrl + 'user?account=' + account + '&isActive=' + isActive, { observe: 'response', params })
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

  changePassword(account: string, oldPassword: string, password: string) {
    const user = {
      Account: account,
      OldPassword: oldPassword,
      Password: password
    };
    return this.http.put<OperationResult>(this.baseUrl + 'User/changepassword', user);
  }

  addUser(addUser: any, file: File) {
    debugger
    const formDataadd = this.getFormDataUser(addUser, file);
    return this.http.post(this.baseUrl + 'User/adduser', formDataadd);
  }

  //
  getFormDataUser(user: any, file: File) {
    const formData = new FormData();
    formData.append('account', user.account);
    formData.append('email', user.email);
    formData.append('name', user.name);
    formData.append('is_active', user.is_active);
    formData.append('File', file);
    if (user.password !== null)
      formData.append('Password', user.password);
    return formData;
  }
  //

  editUser(updateUser: any, file: File) {
    debugger
    const formDataadd = this.getFormDataUser(updateUser, file);
    return this.http.put(this.baseUrl + 'User/update', formDataadd);
  }

  getRoleByUser(account: string) {
    return this.http.get<RoleByUser[]>(this.baseUrl + 'User/roleuser/' + account);
  }

  updateRoleByUser(account: string, listRoleByUser: RoleByUser[]) {
    return this.http.put(this.baseUrl + 'User/roleuser/' + account, listRoleByUser);
  }
  deleteUser(user: string){
    return this.http.delete<OperationResult>(this.baseUrl + 'User/' + user);
  }
}
