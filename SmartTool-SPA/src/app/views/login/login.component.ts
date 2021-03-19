import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertUtilityService } from '../../_core/_services/alertUtility.service';
import { AuthService } from '../../_core/_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertUtilityService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    console.log(this.user);
    this.spinner.show();
    this.authService.login(this.user).subscribe(
      next => {
        this.alertify.success('Login Success!!', 'Success');
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.alertify.error('Login failed!!', 'Error');
        this.spinner.hide();
      },
      () => {
        this.router.navigate(['/dashboard']);
        this.spinner.hide();
      }
    );
  }
}
