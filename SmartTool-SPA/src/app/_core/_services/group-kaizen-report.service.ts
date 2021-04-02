import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Efficiency } from '../_models/efficiency';
import { Factory } from '../_models/factory';
import { KaizenBenefitsApplicationForm } from '../_models/kaizen-benefits-application-form';
import { ModelKaizenReport } from '../_models/model-kaizen-report';
import { OperationResult } from '../_models/operation-result';
import { PaginatedResult } from '../_models/pagination';
import { GroupKaizenReportStore } from '../_stores/group-kaizen-report.store';

@Injectable({
  providedIn: 'root'
})
export class GroupKaizenReportService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private groupKaizenReportStore: GroupKaizenReportStore
  ) { }

  modelSource = new BehaviorSubject<ModelKaizenReport>(null);
  currentModel = this.modelSource.asObservable();
  kaizenSource = new BehaviorSubject<object>(null);
  currentKaizen = this.kaizenSource.asObservable();
  getAllFactory(): Observable<Factory[]> {
    return this.http.get<Factory[]>(this.baseUrl + 'groupKaizenReport/getAllFactory/', {});
  }

  search(page?, itemsPerPage?, text?: any): Observable<PaginatedResult<ModelKaizenReport[]>> {
    const paginatedResult: PaginatedResult<ModelKaizenReport[]> = new PaginatedResult<ModelKaizenReport[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.post<any>(this.baseUrl + 'GroupKaizenReport/search', text, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  exportExcel(param: any) {
    return this.http.post(this.baseUrl + 'groupKaizenReport/exportExcel', param, {responseType: 'blob' })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'Excel_' + 'GroupKaizenReport' + currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) + currentTime.getDate() +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

  changeModel(model: ModelKaizenReport) {
    this.modelSource.next(model);
  }

  changeKaizen(model: object) {
    this.kaizenSource.next(model);
  }

  getSeasonByUpper(factory_id: string, upper_id: string) {
    return this.http.get<string[]>(`${this.baseUrl}groupKaizenReport/getSeason`,
                                  {params: {factory_id: factory_id, upper_id: upper_id} }).pipe(
                                    tap(seasonByUpper => {
                                      this.groupKaizenReportStore.update(seasonByUpper);
                                    })
                                  );
  }

  getDataChart(factory_id: string , upper_id: string, season: string) {
    return this.http.get<Efficiency[]>(`${this.baseUrl}groupKaizenReport/getEfficiencys`,
                                    {params: {factory_id: factory_id, upper_id: upper_id, season: season}}).pipe(
                                      tap(dataChart => {
                                        this.groupKaizenReportStore.update(dataChart);
                                      })
                                    );
  }

  getKaizens(page?, itemsPerPage?, factory_id?: string, model_no?: string): Observable<PaginatedResult<any[]>> {
    const paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
      params = params.append('factory_id', factory_id);
      params = params.append('model_no', model_no);
    }
    return this.http.get<any>(this.baseUrl + 'groupKaizenReport/getKaizens', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  updateClickTimes(data: any) {
    return this.http.post(`${this.baseUrl}groupKaizenReport/updateClickTimes`, data, {} ).pipe(
      tap(clicksTimes => {
        this.groupKaizenReportStore.update(clicksTimes);
      })
    );
  }

  getKaizenDetail(factory_id: string, model_no: string, serial_no: string) {
    return this.http.get<any>(`${this.baseUrl}groupKaizenReport/getkaizenDetail`,
                              {params: {factory_id: factory_id, model_no: model_no, serial_no: serial_no}}).pipe(
                                tap(kaizenDetail => {
                                  this.groupKaizenReportStore.set(kaizenDetail);
                                })
                              );
  }

  getFactory() {
    return this.http.get(`${this.baseUrl}groupKaizenReport/getFactory`, {responseType: 'text'});
  }

  addCross(model: KaizenBenefitsApplicationForm) {
    return this.http.post<OperationResult>(this.baseUrl + 'groupKaizenReport/addCrossSiteSharing', model).pipe(
      tap(cross => {
        this.groupKaizenReportStore.update(cross);
      })
    );
  }

}
