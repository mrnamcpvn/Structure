import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}
  canActive(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
