import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Kaizen } from '../_models/kaizen';
import { OperationResult } from '../_models/operation-result';
import { PaginatedResult } from '../_models/pagination';
import { KaizenStore } from '../_stores/kaizen.store';

@Injectable({
  providedIn: 'root'
})
export class KaizenService {
  baseUrl = environment.apiUrl;
  modelNoSource = new BehaviorSubject<string>('');
  currentModelNo = this.modelNoSource.asObservable();
  modelNameSource = new BehaviorSubject<string>('');
  currentModelName = this.modelNameSource.asObservable();
  kaizenSource = new BehaviorSubject<Object>({});
  currentKaizen = this.kaizenSource.asObservable();

  constructor(
    private http: HttpClient,
    private kaizenStore: KaizenStore
    ) { }
  search(page?, modelNO?): Observable<PaginatedResult<Kaizen[]>> {
    const paginatedResult: PaginatedResult<Kaizen[]> = new PaginatedResult<Kaizen[]>();
    let params = new HttpParams();
    params = params.append('pageNumber', page);
    params = params.append('pageSize', '10');
    params = params.append('modelNo', modelNO == 'All' ? '' : modelNO);

    return this.http.get<Kaizen[]>(this.baseUrl + 'Kaizen/kazenList', { observe: 'response', params })
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

  getDataModelNo() {
    return this.http.get<any>(`${this.baseUrl}kaizen/getModel`).pipe(
      tap(value => {
        this.kaizenStore.set(value);
      })
    );
  }
  changeModel( model_no: string, model_name: string ) {
    this.modelNoSource.next(model_no);
    this.modelNameSource.next(model_name);
  }
  create(kaizen: Kaizen) {
    console.log('Service: ', kaizen);
    return this.http.post<OperationResult>(`${this.baseUrl}Kaizen/create`, kaizen);
  }
  update(kaizen: Kaizen) {
    console.log('Service: ', kaizen);
    return this.http.put<OperationResult>(`${this.baseUrl}kaizen/update`, kaizen).pipe(
      tap(value => {
        this.kaizenStore.update(value);
      })
    );
  }
  getDataStage() {
    return this.http.get<any>(`${this.baseUrl}kaizen/getStage`).pipe(
      tap(value => {
        this.kaizenStore.set(value);
      })
    );
  }
  getProcess(modelNO: string, stage: string) {
    return this.http.get<any>(`${this.baseUrl}kaizen/getProcess`, {  params : {modelNo: modelNO, stage: stage}}).pipe(
      tap(value => {
        this.kaizenStore.set(value);
      })
    )
    ;
  }
  getOpera(modelNO: string, stage: string, process: string) {
    return this.http.get<any>(`${this.baseUrl}kaizen/getOpera`, {params : {modelNo: modelNO, stage: stage, process: process}}).pipe(
      tap(data => {
        this.kaizenStore.set(data);
      })
    );
  }
  getKaizenFrom() {
    return this.http.get<any>(`${this.baseUrl}kaizen/getKaizenFrom`).pipe(
      tap(data => {
        this.kaizenStore.set(data);
      })
    );
  }
  changeKaizen(kaizen: Kaizen) {
    this.kaizenSource.next(kaizen);
  }
  getKaizenEdit(modelNO: string, serialNo: string) {
    return this.http.get<Kaizen[]>(`${this.baseUrl}kaizen/getKaizenEdit`, {params : {modelNo: modelNO, serialNo: serialNo}}).pipe(
      tap(data => {
        this.kaizenStore.update(data);
      })
    );
  }

}
