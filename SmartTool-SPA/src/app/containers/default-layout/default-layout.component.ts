import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../_core/_services/auth.service';
import { CustomNgSnotifyService } from '../../_core/_services/snotify.service';
import { UserService } from '../../_core/_services/user.service';
import { NavItem } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];
  currentUser: any = JSON.parse(localStorage.getItem('user'));
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  @ViewChild('modalChangePassword', { static: false }) modalEditUser: ModalDirective;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(private authService: AuthService,
    private snotifyService: CustomNgSnotifyService,
    private router: Router,
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private nav: NavItem) {
      this.navItems = this.nav.getNav(this.currentUser);
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authService.decodedToken = null;
      this.authService.currentUser = null;
      this.snotifyService.info('Logged out');
      this.router.navigate(['/login']);
    }
}
