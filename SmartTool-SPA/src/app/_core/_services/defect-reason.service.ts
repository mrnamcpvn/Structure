import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DefectReason } from '../_models/defect-reason';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DefectReasonService {
  baseURL = environment.apiUrl;
  flagSource = new BehaviorSubject<string>("0");
  currentFlag = this.flagSource.asObservable();
  defectreasonSource = new BehaviorSubject<Object>({});
  cuttentdefectreason = this.defectreasonSource.asObservable();


  constructor( private http: HttpClient) { }


  getdr( page?, itemsPerPage?, defectreasonParam?: object): Observable<PaginatedResult<DefectReason[]>>
  {
    const paginatedResult: PaginatedResult<DefectReason[]> =new PaginatedResult<DefectReason[]>();
    let params = new HttpParams();
    if(page != null && itemsPerPage != null)
    {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    let url = this.baseURL +"defectreason/search";
    return this.http.post<any>(url,defectreasonParam,{observe: "response", params})
    .pipe(
      map((response)=>{
        paginatedResult.result = response.body;
        if(response.headers.get("Pagination") != null){
          paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }
        return paginatedResult;
      })
    );
  }

  adddr(der: DefectReason){
    return  this.http.post(this.baseURL + "defectReason/create", der);
  }

  changeFlag(flag: string){
    this.flagSource.next(flag);
  }
  update(der: DefectReason){
    return this.http.put(this.baseURL +"defectReason/update", der)
  }

}
