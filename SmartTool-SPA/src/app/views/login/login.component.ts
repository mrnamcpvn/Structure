import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../_core/_services/auth.service";
import { Router } from "@angular/router";
import { AlertifyService } from "../../_core/_services/alertify.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // with angular 11
    // if you call this.authService.loggedIn so return 1 action type
    //  call this.authService.loggedIn()  rerturn value: true or false
    // Done  good work
    if (this.authService.loggedIn()) this.router.navigate(["/dashboard"]);
  }

  login() {-
    console.log(this.user);
    this.spinner.show();
    this.authService.login(this.user).subscribe(
      (next) => {
        this.alertify.success("Login Success!!")
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.alertify.error("Login failed!!")
        this.spinner.hide();
      },
      () => {
        this.router.navigate(["/dashboard"]);
        this.spinner.hide();
      }
    );
    this.spinner.hide();
  }
}
