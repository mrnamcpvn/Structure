import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ModelCrossSiteSharing, ModelCrossSiteSharingEdit } from '../_models/model-cross-site-sharing';
import { Observable } from 'rxjs';
import { Factory } from '../_models/factory';
import { OperationResult } from '../_models/operation-result';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CrossSiteSharingService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }
    modelSource = new BehaviorSubject<ModelCrossSiteSharing[]>(null);
    currentModel = this.modelSource.asObservable();

    getAllFactory(): Observable<Factory[]> {
        return this.http.get<Factory[]>(this.baseUrl + 'groupKaizenReport/getAllFactory/', {});
    }
    changeCrossSiteSharing(models: ModelCrossSiteSharing[]) {
        this.modelSource.next(models);
    }
    UpdateCrossSiteSharing(model: ModelCrossSiteSharing) {
        return this.http.post<OperationResult>(this.baseUrl + 'CrossSiteSharing/update', model);
    }
    getCrossSiteSharingPDF(model: ModelCrossSiteSharing) {
        return this.http.post<ModelCrossSiteSharingEdit[]>(this.baseUrl + 'CrossSiteSharing/getCrossSiteSharingPDF', model);
    }
    getCrossSiteSharingEdit(factory: string, modelNO: string, serialNo: string) {
        return this.http.get<ModelCrossSiteSharingEdit>(this.baseUrl + 'CrossSiteSharing/getCrossSiteSharingEdit', { params: { factory: factory, modelNo: modelNO, serialNo: serialNo } });
    }

    search(page?, itemsPerPage?, text?: any): Observable<PaginatedResult<ModelCrossSiteSharing[]>> {
        const paginatedResult: PaginatedResult<ModelCrossSiteSharing[]> = new PaginatedResult<ModelCrossSiteSharing[]>();
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        return this.http.post<any>(this.baseUrl + 'crossSiteSharing/search/', text, { observe: 'response', params })
            .pipe(
                map(response => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return paginatedResult;
                }
                )
            );
    }

}