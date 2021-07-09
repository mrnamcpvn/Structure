import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ModelOperation } from "../_models/model-operation";
import { ModelOperationEditParam } from "../_models/model-operationEditParam";
import { PaginatedResult } from "../_models/pagination";

@Injectable({
  providedIn: "root",
})
export class ModelOperationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(
    page?,
    itemsPerPage?,
    modelParam?: object
  ): Observable<PaginatedResult<ModelOperation[]>> {
    const paginatedResult: PaginatedResult<ModelOperation[]> =
      new PaginatedResult<ModelOperation[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    let url = this.baseUrl + "modelOperation/modelOperation-list";
    return this.http
      .post<any>(url, modelParam, { observe: "response", params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }

  getModelNo() {
    return this.http.get<any>(this.baseUrl + "modelOperation/model-no", {});
  }

  getStage() {
    return this.http.get<any>(this.baseUrl + "modelOperation/stage", {});
  }

  getProcessType() {
    return this.http.get<any>(this.baseUrl + "modelOperation/process-type", {});
  }

  getModelOperationEdit(modelOperation: ModelOperationEditParam) {
    return this.http.post<ModelOperation>(
      this.baseUrl + "modelOperation/getModelOperation/",
      modelOperation
    );
  }

  createModelOperation(modelOperation: ModelOperation) {
    return this.http.post(
      this.baseUrl + "modelOperation/create-operation/",
      modelOperation
    );
  }

  updateModelOperation(modelOperation: ModelOperation) {
    return this.http.post(
      this.baseUrl + "modelOperation/updateModelOperation/",
      modelOperation
    );
  }

  deleteModelOperation(modelOperation: ModelOperation) {
    return this.http.post(
      this.baseUrl + "modelOperation/deleteModelOperation/",
      modelOperation
    );
  }
}
