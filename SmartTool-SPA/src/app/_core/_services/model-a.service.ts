import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Model } from '../_models/model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelStore } from '../_stores/model.store';

@Injectable({
  providedIn: 'root',
})
export class ModelAService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private modelStore: ModelStore) {}

  getAllModelType() {
    return this.http.get<Model[]>(`${this.apiUrl}Model/model-type`, {}).pipe(
      tap((modelType) => {
        this.modelStore.set(modelType);
      })
    );
  }

  GetAllAsync() {
    return this.http.post<Model[]>(`${this.apiUrl}Model/model-list`, {}).pipe(
      tap((models) => {
        this.modelStore.set(models);
      })
    );
  }

  AddAsync(model: Model): Observable<any> {
    return this.http.post<Model>(`${this.apiUrl}Model/add-model`, model).pipe(
      tap((value) => {
        this.modelStore.add(value);
      })
    );
  }

  Update(model: Model): Observable<any> {
    return this.http
      .post<Model>(`${this.apiUrl}Model/update-Model`, model)
      .pipe(
        tap((result) => {
          this.modelStore.update(model.model_no, model);
        })
      );
  }

  deleteModel(model: Model): Observable<any> {
    let params = new HttpParams();
    params = params.append('factory_id', model.factory_id);
    params = params.append('model_no', model.model_no);

    return this.http.get(`${this.apiUrl}Model/delete-Model`, {params}).pipe(
      tap((result) => {
        this.modelStore.remove(`${model.factory_id}_${model.model_no}`);
      })
    );
  }

  // getModelNoEdit(modelNo: string): Observable<any> {
  //   return this.http.get<Model>(`${this.apiUrl}/model/edit/${modelNo}`).pipe(
  //     tap(result => {
  //       this.modelStore.set(modelNo);
  //     })
  //   );
  // }
}
