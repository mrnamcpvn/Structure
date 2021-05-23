import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Efficiency } from "../_model/efficiency";
import { ModelEfficiencyEditParam } from "../_model/efficiency-editParam";
@Injectable({
  providedIn: "root",
})
export class ModelEfficiencyService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getModelName(upperId: string) {
    return this.http.get<any>(this.baseUrl + "/modelefficiency/modelName", {
      params: {
        upperId: upperId,
      },
    });
  }

  getUpperId() {
    return this.http.get<any>(this.baseUrl + "modelefficiency/upperId", {});
  }

  getModelEfficiency(modelEfficiencyEditPram: ModelEfficiencyEditParam) {
    return this.http.post<Efficiency[]>(
      this.baseUrl + "modelEfficiency/getModelEfficiency/",
      modelEfficiencyEditPram
    );
  }

  updateModelEfficiency(modelEfficiency: any) {
    return this.http.post(
      this.baseUrl + "modelEfficiency/updateModelEfficiency/",
      modelEfficiency
    );
  }
}
