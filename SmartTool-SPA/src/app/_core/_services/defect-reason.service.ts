import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { DefectReason } from "./../_model/defect-reason";
import { PaginatedResult } from "./../_model/pagination";

@Injectable({
  providedIn: "root",
})
export class DefectReasonService {
  baseUrl = environment.apiUrl;
  defectReasonSource = new BehaviorSubject<Object>({});
  flagSource = new BehaviorSubject<string>("0");
  currentDefectReason = this.defectReasonSource.asObservable();
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) {}

  search(
    page?,
    itemsPerPage?,
    defectReasonParam?: object
  ): Observable<PaginatedResult<DefectReason[]>> {
    const paginatedResult: PaginatedResult<DefectReason[]> =
      new PaginatedResult<DefectReason[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    let url = this.baseUrl + "defectreason/search";
    return this.http
      .post<any>(url, defectReasonParam, { observe: "response", params })
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

  createDefectReason(defectReason: DefectReason) {
    return this.http.post(this.baseUrl + "defectReason/create", defectReason);
  }

  updateDefectReason(defectReason: DefectReason) {
    return this.http.post(this.baseUrl + "defectReason/update", defectReason);
  }

  changeDefectReason(defectraeson: DefectReason) {
    this.defectReasonSource.next(defectraeson);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }
}
