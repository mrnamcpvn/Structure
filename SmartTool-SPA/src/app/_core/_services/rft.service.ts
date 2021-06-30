import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MeasumentRFT } from '../_models/MeasumentRFT';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class RftService {

  baseUrl = environment.apiUrl;
  rftconditionSource = new BehaviorSubject<Object>({});
  currentCondition = this.rftconditionSource.asObservable();
  rftSource = new BehaviorSubject<Object>({});
  currentRFT = this.rftSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  search(page?, modelNO?, stage?): Observable<PaginatedResult<MeasumentRFT>> {
    // const paginatedResult: PaginatedResult<MeasumentRFT[]> = new PaginatedResult<MeasumentRFT[]>();
    let params = new HttpParams();
    
    params = params.append("pageNumber", page);
    params = params.append("pageSize", "10");
    params = params.append("modelNo", modelNO == "All" ? "" : modelNO);
    params = params.append("stage", stage == "All" ? "" : stage);

    return this.http.get<PaginatedResult<MeasumentRFT>>(this.baseUrl + "RFT", { params,});
      // .pipe(
      //   map((response) => {
      //     paginatedResult.result = response.body;
      //     if (response.headers.get("Pagination") != null) {
      //       paginatedResult.pagination = JSON.parse(
      //         response.headers.get("Pagination")
      //       );
      //     }
      //     return paginatedResult;
      //   })
      // );
  }

  geDataModelNo = () => this.http.get<any>(this.baseUrl + "RFT/getallmodel");

  geDataStage = () => this.http.get<any>(this.baseUrl + "RFT/getallstage");

  getProcessType(model_no: string, stage_id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "RFT/process-type", {
      params: {
        model_no: model_no,
        stage_id: stage_id,
      },
    });
  }

  getProcessNOperationForEdit( model_no: string, stage_id: string, operation_id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "RFT/processoperation-for-edit", {
      params: {
        model_no: model_no,
        stage_id: stage_id,
        operation_id: operation_id,
      },
    });
  }

  getOperationName( model_no: string, stage_id: string, process_id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "RFT/getoperationname", {
      params: {
        model_no: model_no,
        stage_id: stage_id,
        process_id: process_id,
      },
    });
  }

  getDataDefectReason = () =>
    this.http.get<any>(this.baseUrl + "RFT/getalldefectreason");

  getRFTCondition(condition: any = {}) {
    this.rftconditionSource.next(condition);
  }

  changeRFT(rft: MeasumentRFT) {
    this.rftSource.next(rft);
  }

  createMeasurementRFT(measurementrft: MeasumentRFT) {
    return this.http.post(this.baseUrl + "RFT/create", measurementrft);
  }

  updateMeasurementRFT(measurementrft: MeasumentRFT) {
    return this.http.put(this.baseUrl + "RFT/edit", measurementrft);
  }
}
