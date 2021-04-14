import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    debugger
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
