import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Model } from "../_models/model";
import { OperationResult } from "../_models/operation-result";
import { PaginatedResult } from "../_models/pagination";
import { ModelStore } from "../_stores/model.store";


@Injectable({
    providedIn: 'root'
})
export class ModelService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient, private modelStore: ModelStore) { }

    // search(page?, itemsPerPage?, modelParam?: object): Observable<PaginatedResult<Model[]>> {
    //     const paginatedResult: PaginatedResult<Model[]> = new PaginatedResult<Model[]>();
    //     let param = new HttpParams();

    //     if(page != null && itemsPerPage != null) {
    //         param = param.append('pageNumber', page);
    //         param = param.append('pageSize', itemsPerPage);
    //     }

    //     let url = this.baseUrl + 'model/model-list';
    //     return this.http.post<any>(url, modelParam,  {observe: 'response',  params : param })  //should name params
    //         .pipe(
    //             map(response => {
    //                 paginatedResult.result = response.body;
    //                 if(response.headers.get('Pagination')!=null){
    //                     paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
    //                 }
    //                 return paginatedResult;
    //             })

    //         );
    // }

    getAll(page?, itemsPerPage?, modelParam?: object) {
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        return this.http.post<any>(this.baseUrl + 'model/model-list', {}, { observe: 'response', params }).pipe(
            map(response => {
                this.modelStore.update({ pagination: JSON.parse(response.headers.get('Pagination')) });
                this.modelStore.set(response.body);
            })
        );
    }
    getAllModelType() {
        return this.http.get<any>(this.baseUrl + 'model/model-type/', {}).pipe(
            tap(modelTypes => {
                this.modelStore.update({ modelTypes })
            })
        );
    }

    createModel(model: Model) {
        return this.http.post<OperationResult>(this.baseUrl + 'model/createModel/', model).pipe(
            tap(res => {
                if (res.success)
                    this.modelStore.add(model)
            })
        );
    }

    updateModel(model: Model) {
        return this.http.post<OperationResult>(this.baseUrl + "model/updateModel/", model).pipe(
            tap(res => { if (res.success) this.modelStore.update(model._id, model) }));
    }



    // getAllModelType() {
    //     return this.http.get<any>(this.baseUrl + 'model/model-type/', {});
    // }

    // createModel(model: Model) {
    //     console.log("Service:", model);
    //     return this.http.post(this.baseUrl + 'model/createModel/', model);
    // }

    // updateModel(model: Model) {
    //     return this.http.post(this.baseUrl + "model/updateModel/", model)
    // }

    // getModelNoEdit(modelNo: string) {
    //     return this.http.get<Model>(this.baseUrl + 'model/edit/' + modelNo);
    // }
}
