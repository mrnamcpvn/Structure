import { HttpClient, HttpParams } from "@angular/common/http";
import { ReturnStatement } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Efficiency } from "../_models/efficiency";
import { ModelEfficiencyEditParam } from "../_models/efficiency-editParam";
import { Model } from "../_models/model";
import { PaginatedResult } from "../_models/pagination";

@Injectable({
  providedIn: "root",
})
export class ModelEfficiencyService {
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

  getUpperID() {
    return this.http.get<any>(this.baseUrl + "modelEfficiency/upperId", {});
  }

  updateModel(model: Model) {
    return this.http.post(this.baseUrl + "model/updateModel/", model);
  }
  getModelEfficiency(modelEfficiencyParram: ModelEfficiencyEditParam) {
    console.log("service", modelEfficiencyParram);
    return this.http.post<Efficiency[]>(
      this.baseUrl + "modelEfficiency/getModelEfficiency/",
      modelEfficiencyParram
    );
  }

  updateModelEfficiency(modelEfficiency: any) {
    console.log("modelEF", modelEfficiency)
    return this.http.post(this.baseUrl + 'modelEfficiency/updateModelEfficiency/', modelEfficiency);
  }
  
  getModelNoEdit(modelNo: string) {
    return this.http.get<Model>(this.baseUrl + "model/edit/" + modelNo);
  }
  getModelName(upperId: string) {
    return this.http.get<any>(this.baseUrl + "modelEfficiency/modelName", {
      params: {
        upperId: upperId,
      },
    });
  }
}
