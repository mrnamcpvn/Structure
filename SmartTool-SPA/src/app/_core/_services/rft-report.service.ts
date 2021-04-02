import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Factory } from '../_models/factory';
import { PaginatedResult } from '../_models/pagination';
import { RFTReport } from '../_models/rft-report';
import { RFTReportDetail } from '../_models/rft-report-detail';
import { RFTReportStore } from '../_stores/rft-report.store';

@Injectable({
  providedIn: 'root'
})
export class RFTReportService {
  baseUrl = environment.apiUrl;
  modelSource = new BehaviorSubject<Object>({});
  currentModel = this.modelSource.asObservable();
  constructor(
    private http: HttpClient,
    private rftReportStore: RFTReportStore
    ) {}

  getAllFactory(): Observable<Factory[]> {
    return this.http.get<Factory[]>(`${this.baseUrl}groupKaizenReport/getAllFactory`, {}).pipe(
      tap(factories => {
        this.rftReportStore.update(factories);
      })
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
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    const url = this.baseUrl + 'rftreport/searchrftreport';
    return this.http
      .post<any>(url, rftreportParam, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  searchRFTReportDetail(modelParam?: any) {
    const url = `${this.baseUrl}RFTReport/searchrftreportdetail`;
    return this.http.post<RFTReportDetail>(url, modelParam, {params: { model_no: modelParam }, }).pipe(
      tap(rftReportDetail => {
        this.rftReportStore.update(rftReportDetail);
      })
    );
  }

  getAverage(factory_id: string, model_no: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}rftreport/countavg`, {
      params: { factory_id: factory_id, model_no: model_no }}).pipe(
        tap( average => {
          this.rftReportStore.set(average);
        })
      );
  }

  sendmodel(model: RFTReport) {
    this.modelSource.next(model);
  }

}
