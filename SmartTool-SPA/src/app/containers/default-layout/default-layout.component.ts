import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../_core/_models/user';
import { AlertifyService } from '../../_core/_services/alertify.service';
import { AuthService } from '../../_core/_services/auth.service';
import { UserService } from '../../_core/_services/user.service';
import { commonPerFactory } from '../../_core/_utility/common-fer-factory';
import { NavItem, navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  newPassword: string;
  confirmPassword: string;
  currentUser: any = JSON.parse(localStorage.getItem('userSmartTooling'));
  oldPassword: string;
  @ViewChild('modalChangePassword', { static: false }) modalEditUser: ModalDirective;

  public imageUser = '';
  
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private nav: NavItem
  ){
    this.navItems = this.nav.getNav(this.currentUser);
    this.imageUser = this.currentUser.image === null ? commonPerFactory.imageUserDefault
                                    : commonPerFactory.imageUserUrl + this.currentUser.image;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
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
    debugger
    if (this.newPassword !== this.confirmPassword) {
      this.alertify.error('Confirm password not match!');
      return;
    }
    this.spinnerService.show();
    this.userService.changePassword(this.currentUser.account, this.oldPassword, this.newPassword)
      .subscribe(res => {
        debugger
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
