import { OperationResult } from './../_models/operation-result';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Model } from '../_models/model';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  search(page?, itemsPerPage?, modelParam?: object): Observable<PaginatedResult<Model[]>> {
    const paginatedResult: PaginatedResult<Model[]> = new PaginatedResult<Model[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    const url = this.baseUrl + 'model/model-list';
    return this.http.post<any>(url, modelParam, { observe: 'response', params })
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

  getAllModelType() {
    return this.http.get<any>(this.baseUrl + 'model/model-type', {});
  }

  GetAllAsync() {
    return this.http.get<any>(this.baseUrl + 'Model/model-list', {});
  }

  AddAsync(model: Model) {
    return this.http.post(this.baseUrl + 'model/add-model', model);
  }

  Update(model: Model) {
    return this.http.post(this.baseUrl + 'model/update-Model', model);
  }

  Delete(item: Model) {
    return this.http.post<OperationResult>(this.baseUrl + 'Model/delete-Model', item);
  }

  getModelNoEdit(modelNo: string) {
    return this.http.get<Model>(this.baseUrl + 'model/edit/' + modelNo);
  }
}
