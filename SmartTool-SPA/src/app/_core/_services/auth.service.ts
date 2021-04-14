import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../_models/user";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.apiUrl + "auth/";
  jwtHelper = new JwtHelperService();
  currentUser: User;
  decodedToken: any;
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("tokenSmartTooling", user.token);
          localStorage.setItem("userSmartTooling", JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem("tokenSmartTooling");
    const curentUser = JSON.parse(localStorage.getItem("userSmartTooling"));
    if (curentUser == null || curentUser.role == undefined) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
 
}
