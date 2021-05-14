import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { DefectReason } from "../_models/defect-reason";
import { PaginatedResult } from "../_models/pagination";

@Injectable({ providedIn: "root" })
export class DefectReasonService {
  baseUrl = environment.apiUrl;
  defectReasonSource = new BehaviorSubject<Object>({});
  currentDefectReason = this.defectReasonSource.asObservable();
  flagSource = new BehaviorSubject<string>("0");
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }

  search(page?, itemsPerPage?, defectreasonParam?: object): Observable<PaginatedResult<DefectReason[]>> {
    const paginatedResult: PaginatedResult<DefectReason[]> = new PaginatedResult<DefectReason[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    let url = this.baseUrl + "DefectReason/search";
    return this.http
      .post<any>(url, defectreasonParam, { observe: "response", params })
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
    return this.http.post(this.baseUrl + "DefectReason/create/", defectReason);
  }

  updateDefectReason(defectReason: DefectReason) {
    return this.http.post(this.baseUrl + "DefectReason/edit/", defectReason);
  }

  changeDefectReason(defectReason: DefectReason) {
    this.defectReasonSource.next(defectReason);
  }
  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }
}
