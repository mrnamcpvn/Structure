import { ModelOperationStore } from './../_stores/modelOperation.store';
import { OperationResult } from './../_models/operation-result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ModelOperation } from '../_models/model-operation';
import { ModelOperationEditParam } from '../_models/model-operationEditParam';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ModelOperationService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private modelOperationStore: ModelOperationStore
    ) { }

  GetAllAsync() {
    return this.http.get<ModelOperation[]>(this.baseUrl + 'modelOperation/modelOperation-list', {}).pipe(
      tap(value => {
        this.modelOperationStore.set(value);
      })
    );
  }

  search(page?, itemsPerPage?, modelParam?: object): Observable<PaginatedResult<ModelOperation[]>> {
    const paginatedResult: PaginatedResult<ModelOperation[]> = new PaginatedResult<ModelOperation[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    const url = this.baseUrl + 'modelOperation/modelOperation-list';
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

  getModelOperationEdit(modelOperation: ModelOperationEditParam) {
    return this.http.post<ModelOperation>(this.baseUrl + 'modelOperation/getModelOperation/', modelOperation).pipe(
      tap(item => {
        this.modelOperationStore.update({item});
      })
    );
  }

  getStage() {
    return this.http.get<any>(this.baseUrl + 'modelOperation/stage', {});
  }

  addModelOperation(modelOperation: ModelOperation) {
    return this.http.post(this.baseUrl + 'modelOperation/add-operation/', modelOperation);
  }

  updateModelOperation(modelOperation: ModelOperation) {
    return this.http.post(this.baseUrl + 'modelOperation/update-ModelOperation/', modelOperation);
  }

  deleteModelOperation(item: ModelOperation) {
    return this.http.post<OperationResult>(this.baseUrl + 'modelOperation/delete-ModelOperation/', item);
  }

}
