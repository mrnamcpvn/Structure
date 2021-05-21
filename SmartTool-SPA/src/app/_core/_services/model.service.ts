import { Model } from './../_model/model';
import { PaginatedResult } from './../_model/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


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
  createModel(model: Model) {
    console.log('Service: ', model);
    return this.http.post(this.baseUrl + 'model/createModel/', model);
  }

  getAllModelType() {
    return this.http.get<any>(this.baseUrl + 'model/model-type', {});
  }


  updateModel(model: Model) {
    return this.http.post(this.baseUrl + 'model/updateModel/', model);
  }
  getModelNoEdit(modelNo: string) {
    return this.http.get<Model>(this.baseUrl + 'model/edit/' + modelNo);
  }
}
