import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Factory } from '../_models/factory';
import { PaginatedResult } from '../_models/pagination';
import { RFTReport } from '../_models/rft-report';
import { RFTReportDetail } from '../_models/rft-report-detail';

@Injectable({ providedIn: 'root' })
export class RFTReportService {
    baseUrl = environment.apiUrl;
    modelSource = new BehaviorSubject<Object>({});
    currentModel = this.modelSource.asObservable();
    constructor(private http: HttpClient) { }

    getAllFactory(): Observable<Factory[]> {
        return this.http.get<Factory[]>(
            this.baseUrl + "groupKaizenReport/getAllFactory/",
            {}
        );
    }

    sendmodel(model: RFTReport) {
        this.modelSource.next(model);
    }

    searchRFTReportDetail(modelParam?): Observable<RFTReportDetail[]> {
        let url = this.baseUrl + "RFTReport/searchrftreportdetail";
        return this.http.post<any>(url, modelParam, { params: { model_no: modelParam } });
    }

    getAverage(factory_id: string, model_no: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + "RFTReport/countavg", { params: { factory_id: factory_id, model_no: model_no } });
    }

    searchRFTReport(page?, itemsPerPage?, rftreportParam?): Observable<PaginatedResult<RFTReport[]>> {
        const paginatedResult: PaginatedResult<RFTReport[]> = new PaginatedResult<RFTReport[]>();
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append("pageNumber", page);
            params = params.append("pageSize", itemsPerPage);
        }
        let url = this.baseUrl + 'RFTReport/searchrftreport';
        return this.http.post<any>(url, rftreportParam, { observe: "response", params })
            .pipe(map(res => {
                paginatedResult.result = res.body;
                if (res.headers.get("Pagination") != null)
                    paginatedResult.pagination = JSON.parse(res.headers.get("Pagination"));
                return paginatedResult;
            }))
    }

}