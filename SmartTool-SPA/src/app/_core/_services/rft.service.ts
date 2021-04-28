import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { MeasumentRFT } from '../_models/measuentRFT';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RftService {
    baseUrl = environment.apiUrl;
    rftSource = new BehaviorSubject<Object>({});   //record current data
    currentRFT = this.rftSource.asObservable();
    rftConditionSource = new BehaviorSubject<Object>({});
    currentCondition = this.rftConditionSource.asObservable();

    constructor(private http: HttpClient) { }

    search(page?, modelNO?, stage?): Observable<PaginatedResult<MeasumentRFT[]>> {
        const paginatedResult: PaginatedResult<MeasumentRFT[]> = new PaginatedResult<MeasumentRFT[]>();
        let params = new HttpParams();

        params = params.append("pageNumber", page);
        params = params.append("pageSize", "10");
        params = params.append("modelNo", modelNO == "All" ? "" : modelNO);
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

    createMeasurementRFT(measurementrft: MeasumentRFT) {
        return this.http.post(this.baseUrl + "RFT/create", measurementrft);
    }

    updateMeasurementRFT(measurementrft: MeasumentRFT) {
        // console.log("data: ", measurementrft);
        return this.http.post(this.baseUrl + "RFT/edit", measurementrft);
    }

    getDataModelNo = () => this.http.get<any>(this.baseUrl + "RFT/getallmodel");

    getDataStage = () => this.http.get<any>(this.baseUrl + "RFT/getallstage");

    getProcessType(model_no: string, stage_id: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + "RFT/process-type", {
            params: {
                model_no: model_no,
                stage_id: stage_id,
            },
        });
    }

    getProcessNOperationForEdit(
        model_no: string,
        stage_id: string,
        operation_id: string
    ): Observable<any> {
        return this.http.get<any>(this.baseUrl + "RFT/processnoperationforedit", {
            params: {
                model_no: model_no,
                stage_id: stage_id,
                operation_id: operation_id,
            },
        });
    }

    getOperationName(
        model_no: string,
        stage_id: string,
        process_id: string
    ): Observable<any> {
        return this.http.get<any>(this.baseUrl + "RFT/getoptionname", {
            params: {
                model_no: model_no,
                stage_id: stage_id,
                process_id: process_id,
            },
        });
    }
    getDataDefectReason = () => this.http.get<any>(this.baseUrl + "RFT/getalldefectreason");

    // for merge add & edit page
    // get list page rft condition
    getRFTCondition(condition: any = {}) {
        // console.log("condition", condition);
        this.rftConditionSource.next(condition);
    }
    // record current rft data (edit function only)
    changeRFT(rft: MeasumentRFT) {
        this.rftSource.next(rft);
    }
}