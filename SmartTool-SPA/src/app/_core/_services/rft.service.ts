import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { PaginatedResult } from "../_model/pagination";
import { MeasumentRFT } from "./../_model/measumentRFT";

@Injectable({
  providedIn: "root",
})
export class RftService {
  baseUrl = environment.apiUrl;
  RFTConditionSource = new BehaviorSubject<Object>({});
  rfrSource = new BehaviorSubject<Object>({});
  currentRFT = this.rfrSource.asObservable();
  currentCondition = this.RFTConditionSource.asObservable();
  constructor(private http: HttpClient) {}

  search(page?, modelNo?, stage?): Observable<PaginatedResult<MeasumentRFT[]>> {
    const paginatedResult: PaginatedResult<MeasumentRFT[]> =
      new PaginatedResult<MeasumentRFT[]>();
    let params = new HttpParams();

    params = params.append("pageNumber", page);
    params = params.append("pageSize", "10");
    params = params.append("modelNo", modelNo == "All" ? "" : modelNo);
    params = params.append("stage", stage == "All" ? "" : stage);
    return this.http
      .get<MeasumentRFT[]>(this.baseUrl + "RFT", {
        observe: "response",
        params,
      })
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
  createMeasurementRFT = (measumentRft: MeasumentRFT) =>
    this.http.post(this.baseUrl + "RFT/create", measumentRft);

  updateMeasurementRFT = (measumentRft: MeasumentRFT) =>
    this.http.post(this.baseUrl + "RFT/edit", measumentRft);

  getDataModelNo = () => this.http.get<any>(this.baseUrl + "RFT/GetAllModel");
  getDataStage = () => this.http.get<any>(this.baseUrl + "RFT/GetAllStage");

  getProcessType = (model_no: string, stage_id: string): Observable<any> =>
    this.http.get<any>(this.baseUrl + "RFT/ProcessType", {
      params: {
        model_no: model_no,
        stage_id: stage_id,
      },
    });

  getProcessOperationForEdit = (
    model_no: string,
    model: string,
    stage_id: string
  ): Observable<any> =>
    this.http.get<any>(this.baseUrl + "RFT/GetProcessOperationForEdit", {
      params: {
        model_no: model_no,
        model: model,
        stage_id: stage_id,
      },
    });

  getOperationName = (
    model_no: string,
    process_id: string,
    stage_id: string
  ): Observable<any> =>
    this.http.get<any>(this.baseUrl + "RFT/GetOperationName", {
      params: {
        model_no: model_no,
        process_id: process_id,
        stage_id: stage_id,
      },
    });
  getDataDefectReason = () =>
    this.http.get<any>(this.baseUrl + "RFT/GetAllDefectReason");

  getRFTCondition(condition: any = {}) {
    this.RFTConditionSource.next(condition);
  }
  changedRFT(rft: MeasumentRFT) {
    this.rfrSource.next(rft);
  }
}
