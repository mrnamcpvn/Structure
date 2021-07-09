import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
