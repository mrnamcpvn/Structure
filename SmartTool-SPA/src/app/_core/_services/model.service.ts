import { HttpClient, HttpParams } from "@angular/common/http";
import { ReturnStatement } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Model } from "../_models/model";
import { PaginatedResult, Pagination } from "../_models/pagination";
const API = environment.apiUrl;
@Injectable({
  providedIn: "root",
})
export class ModelService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(
    page?,
    itemsPerPage?,
    modelParam?: object
  ): Observable<PaginatedResult<Model[]>> {
    const paginatedResult: PaginatedResult<Model[]> = new PaginatedResult<
      Model[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    let url = this.baseUrl + "model/model-list";
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
          console.log(paginatedResult);
          return paginatedResult;
        })
      );
  }
  searchModel(pagination: Pagination, modelParam: any) {
    let params = new HttpParams();
    if (pagination.currentPage != null && pagination.pageSize != null) {
      params = params.append("pageNumber", pagination.currentPage.toString());
      params = params.append("pageSize", pagination.pageSize.toString());
    }
    return this.http.post<PaginatedResult<Model[]>>(
      `${API}Model/model-list`,
      modelParam,
      { params }
    );
  }
  getAllModelType() {
    return this.http.get<any>(this.baseUrl + "model/model-type", {});
  }

  createModel(model: Model) {
    console.log("Service: ", model);
    return this.http.post(this.baseUrl + "model/createModel/", model);
  }

  updateModel(model: Model) {
    return this.http.post(this.baseUrl + "model/updateModel/", model);
  }

  getModelNoEdit(modelNo: string) {
    return this.http.get<Model>(this.baseUrl + "model/edit/" + modelNo);
  }
}
