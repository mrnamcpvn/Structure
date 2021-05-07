import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { PaginatedResult } from "../_models/pagination";
import { ModelOperation } from "../_models/model-operation";
import { ModelOperationEditParam } from "../_models/mode-operationEditParam";
import { ModelOperationStore } from "../_stores/model-operation.store";
import { OperationResult } from "../_models/operation-result";
@Injectable({
  providedIn: "root",
})
export class ModelOperationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private modelOperationStore: ModelOperationStore) { }

  search(page?, itemsPerPage?, modelParam?: object) {
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.post<any>(this.baseUrl + "modelOperation/modelOperation-list", modelParam, { observe: 'response', params }).pipe(
      map(response => {
        this.modelOperationStore.update({ pagination: JSON.parse(response.headers.get("Pagination")) });
        this.modelOperationStore.set(response.body);
      })
    );
  }
  updateModelOperation(modelOperation: ModelOperation) {
    return this.http.post<OperationResult>(this.baseUrl + "modelOperation/updateModelOperation", modelOperation).pipe(
      tap(res => {
        if (res.success) this.modelOperationStore.update(modelOperation._id, modelOperation);
      }));
  }

  createModelOperation(modelOperation: ModelOperation) {

    return this.http.post<OperationResult>(this.baseUrl + 'modelOperation/create-operation/', modelOperation).pipe(
      tap(res => { if (res.success) this.modelOperationStore.add(modelOperation) }));
  }

  deleteModelOperation(modelOperation: ModelOperation) {
    return this.http.post<OperationResult>(this.baseUrl + "modelOperation/deleteModelOperation/", modelOperation).pipe(
      tap(res => { if (res.success == true) this.modelOperationStore.remove(modelOperation._id) }));
  }

  getModelNo() {
    return this.http.get<any>(this.baseUrl + 'modelOperation/model-no', {}).pipe(
      tap(modelNo => { this.modelOperationStore.update({ modelNo }) })
    );
  }

  getStage() {
    return this.http.get<any>(this.baseUrl + 'modelOperation/stage', {}).pipe(
      tap(stage => { this.modelOperationStore.update({ stage }) })
    );
  }

  getProcessType() {
    return this.http.get<any>(this.baseUrl + 'modelOperation/process-type', {}).pipe(
      tap(processType => {
        this.modelOperationStore.update({ processType })
      })
    );
  }

  // search(page?, itemsPerPage?, modelParam?: object): Observable<PaginatedResult<ModelOperation[]>> {
  //   const paginatedResult: PaginatedResult<ModelOperation[]> = new PaginatedResult<ModelOperation[]>();
  //   let params = new HttpParams();

  //   if (page != null && itemsPerPage != null) {
  //     params = params.append('pageNumber', page);
  //     params = params.append('pageSize', itemsPerPage);
  //   }
  //   let url = this.baseUrl + 'modelOperation/modelOperation-list';
  //   return this.http.post<any>(url, modelParam, { observe: 'response', params })
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

  // getModelNo() {
  //   return this.http.get<any>(this.baseUrl + 'modelOperation/model-no', {});
  // }

  // getStage() {
  //   return this.http.get<any>(this.baseUrl + 'modelOperation/stage', {});
  // }

  // getProcessType() {
  //   return this.http.get<any>(this.baseUrl + 'modelOperation/process-type', {});
  // }

  // getModelOperationEdit(modelOperation: ModelOperationEditParam) {
  //   return this.http.post<ModelOperation>(this.baseUrl + 'modelOperation/getModelOperation/', modelOperation);
  // }

  // createModelOperation(modelOperation: ModelOperation) {
  //   return this.http.post(this.baseUrl + 'modelOperation/create-operation/', modelOperation);
  // }

  // updateModelOperation(modelOperation: ModelOperation) {
  //   return this.http.post(this.baseUrl + "modelOperation/updateModelOperation/", modelOperation);
  // }

  // deleteModelOperation(modelOperation: ModelOperation) {
  //   return this.http.post(this.baseUrl + "modelOperation/deleteModelOperation/", modelOperation);
  // }
}
