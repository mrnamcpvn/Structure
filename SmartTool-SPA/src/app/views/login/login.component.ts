import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_core/_services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomNgSnotifyService } from '../../_core/_services/snotify.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private snotifyService: CustomNgSnotifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) this.router.navigate(["/dashboard"]);
  }

  login() {
    console.log(this.user);
    this.spinner.show();
    this.authService.login(this.user).subscribe(
      next => {
        this.snotifyService.success("Login Success!!")
        this.spinner.hide();
      },
      error => {
        console.log(error)
        this.snotifyService.error("Login failed!!")
        this.spinner.hide();
      },
      () => {
        this.router.navigate(["/dashboard"]);
        this.spinner.hide();
      }
    );
  }
}
