import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Factory } from "../_model/factory";
import { PaginatedResult } from "../_model/pagination";
import { RFTReport } from "../_model/rft-report";
import { RFTReportDetail } from "../_model/rft-report-detail";

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token"),
  }),
};

@Injectable({
  providedIn: "root",
})
export class RFTReportService {
  baseUrl = environment.apiUrl;
  modelSource = new BehaviorSubject<Object>({});
  currentModel = this.modelSource.asObservable();
  constructor(private http: HttpClient) {}

  getAllFactory(): Observable<Factory[]> {
    return this.http.get<Factory[]>(
      this.baseUrl + "groupKaizenReport/getAllFactory/",
      {}
    );
  }
  searchRFTReport(
    page?,
    itemsPerPage?,
    rftreportParam?: any
  ): Observable<PaginatedResult<RFTReport[]>> {
    const paginatedResult: PaginatedResult<RFTReport[]> = new PaginatedResult<
      RFTReport[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    let url = this.baseUrl + "rftreport/searchrftreport";
    return this.http
      .post<any>(url, rftreportParam, { observe: "response", params })
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

  searchRFTReportDetail(modelParam?: any): Observable<RFTReportDetail[]> {
    let url = this.baseUrl + "rftreport/searchrftreportdetail";
    return this.http.post<any>(url, modelParam, {
      params: { model_no: modelParam },
    });
  }

  getAverage(factory_id: string, model_no: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "rftreport/countavg", {
      params: { factory_id: factory_id, model_no: model_no },
    });
  }

  sendmodel(model: RFTReport) {
    this.modelSource.next(model);
  }
}
