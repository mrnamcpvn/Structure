import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Kaizen } from "../_model/kaizen";
import { OperationResult } from "../_model/operation-result";
import { PaginatedResult } from "../_model/pagination";

@Injectable({
  providedIn: "root",
})
export class KaizenService {
  baseUrl = environment.apiUrl;
  modelNoSource = new BehaviorSubject<string>("");
  currentModeNo = this.modelNoSource.asObservable();
  modelNameSource = new BehaviorSubject<string>("");
  currentModename = this.modelNameSource.asObservable();
  kaizenSource = new BehaviorSubject<Object>({});
  currentKaizen = this.kaizenSource.asObservable();
  constructor(private http: HttpClient) {}

  search(page?, modelNo?): Observable<PaginatedResult<Kaizen[]>> {
    const paginatedResult: PaginatedResult<Kaizen[]> = new PaginatedResult<
      Kaizen[]
    >();
    let params = new HttpParams();
    params = params.append("pageNumber", page);
    params = params.append("pageSize", "10");
    params = params.append("modelNo", modelNo == "All" ? "" : modelNo);

    return this.http
      .get<Kaizen[]>(this.baseUrl + "kaizen/kaizen-list", {
        observe: "response",
        params,
      })
      .pipe(
        map((res) => {
          paginatedResult.result = res.body;
          if (res.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }
  create(kaizen: Kaizen) {
    return this.http.post<OperationResult>(
      this.baseUrl + "kaizen/create",
      kaizen
    );
  }
  update(kaizen: Kaizen) {
    return this.http.post<OperationResult>(
      this.baseUrl + "kaizen/update",
      kaizen
    );
  }
  getDataModelNo() {
    return this.http.get<any>(this.baseUrl + "kaizen/getmodel");
  }
  changeModel(model_no: string, model_name: string) {
    this.modelNoSource.next(model_no);
    this.modelNameSource.next(model_name);
  }
  getDataStage() {
    return this.http.get<any>(this.baseUrl + "kaizen/getstage");
  }
  getProcess() {
    this.http.get<any>(this.baseUrl + "kaizen/getprocess");
  }
  getOpera(modelNo: string, stage: string, process: string) {
    return this.http.get<any>(this.baseUrl + "kaizen/getopera", {
      params: {
        modelNo: modelNo,
        stage: stage,
        process: process,
      },
    });
  }
  getKaizenForm() {
    return this.http.get<any>(this.baseUrl + "kaizen/getkaizenform");
  }
  changeKaizen(kaizen: Kaizen) {
    this.kaizenSource.next(kaizen);
  }
  getKaizenEdit(modelNo: string, seriaNo: string) {
    return this.http.get<Kaizen[]>(this.baseUrl + "kaizen/getKaizenEdit", {
      params: {
        modelNo: modelNo,
        seriaNo: seriaNo,
      },
    });
  }
}
