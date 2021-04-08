import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../_core/_services/alertify.service';
import { AuthService } from '../../_core/_services/auth.service';
import { UserService } from '../../_core/_services/user.service';
import { NavItem } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];
  currentUser: any = JSON.parse(localStorage.getItem('userSmartTooling'));
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  @ViewChild('modalChangePassword', { static: false }) modalEditUser: ModalDirective;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private nav: NavItem) {
    this.navItems = this.nav.getNav(this.currentUser);
  }

  logout() {
    localStorage.removeItem('tokenSmartTooling');
    localStorage.removeItem('userSmartTooling');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/login']);
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.alertify.error('Confirm password not match!');
      return;
    }
    this.spinnerService.show();
    this.userService.changePassword(this.currentUser.username, this.oldPassword, this.newPassword)
      .subscribe(res => {
        if (res.success) {
          this.alertify.success(res.message);
          this.spinnerService.hide();
          this.modalEditUser.hide();
        }
        else {
          this.alertify.error(res.message);
          this.spinnerService.hide();
        }
      }, error => {
        this.alertify.error('Fail change pasword user!');
        this.spinnerService.hide();
      });
  }
}
