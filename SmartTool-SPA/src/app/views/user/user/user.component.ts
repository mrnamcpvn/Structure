import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Pagination } from '../../../_core/_models/pagination';
import { RoleByUser } from '../../../_core/_models/role-by-user';
import { User } from '../../../_core/_models/user';
import { UserQuery } from '../../../_core/_queries/user.quey';
import { SignalrService } from '../../../_core/_services/signalr.service';
import { CustomNgSnotifyService } from '../../../_core/_services/snotify.service';
import { UserService } from '../../../_core/_services/user.service';
import { UserStore } from '../../../_core/_stores/user.store';

@UntilDestroy()
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  account: string = '';
  isActive: string = 'all';

  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  addUser: User = new User();
  editUser: User = new User();
  userAuthorizationAccount: string = '';
  userAuthorizationName: string = '';
  listRoleByUser: RoleByUser[] = [];
  modalRef: BsModalRef;

  @ViewChild('authorizationModal', { static: false }) authorizationModal: ModalDirective;

  @ViewChild('modalAddUser', { static: false }) modalAddUser: ModalDirective;

  @ViewChild('modalEditUser', { static: false }) modalEditUser: ModalDirective;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private snotify: CustomNgSnotifyService,
    private modalService: BsModalService,
    private userStore: UserStore,
    private userQuery: UserQuery,
    private signalRService: SignalrService) { }

  ngOnInit() {
    timer(5000).pipe(switchMap(() => this.userService.getUsers(this.account, this.isActive, this.pagination.currentPage, this.pagination.itemsPerPage))).subscribe();

    //create a "isloading" subscription
    this.userQuery.selectLoading().pipe(untilDestroyed(this))
      .subscribe(isLoading => isLoading ? this.spinner.show() : this.spinner.hide());
    //create a entities subscription
    this.userQuery.selectAll().pipe(untilDestroyed(this))
      .subscribe(users => this.users = users);
    //Create a 'Pagination' subscription
    this.userQuery.select(state => state.pagination)
      .subscribe(pagination => this.pagination = pagination);
    //Create a 'listRoleByUser' subscription
    this.userQuery.select(state => state.listRoleByUser)
      .subscribe(listRoleByUser => this.listRoleByUser = listRoleByUser);

    let connection = this.signalRService.connectSignalR();

    connection.on("BroadcastMessage", () => this.getUser());

  }
  getUser() {
    this.userService.getUsers(this.account, this.isActive, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe();
  }

  search() {
    this.pagination.currentPage = 1;
    this.getUser();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUser();
  }

  openModalEditUser(user: User) {
    this.editUser = user;
    this.modalEditUser.show();
  }
  clear() {
    this.account = "";
    this.isActive = "all";
    this.getUser();
  }

  openModalAuthorization(account: string, name: string) {
    this.userAuthorizationAccount = account;
    this.userAuthorizationName = name;
    this.userService.getRoleByUser(this.userAuthorizationAccount).subscribe(res => {
      this.listRoleByUser = res;
      this.authorizationModal.show();
    });
  }

  saveAuthorizationUser() {
    const updateRoleByUser = this.listRoleByUser.filter(item => item.status === true);
    this.userService.updateRoleByUser(this.userAuthorizationAccount, updateRoleByUser).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.snotify.success("Update User Authorization Success!", "Success!");
        this.authorizationModal.hide();
      }, error => this.snotify.error("Something wrong here", "Error!"));

  }
  saveAddUser() {
    this.userService.addUser(this.addUser).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.snotify.success("Add User Success", "Success!");
        this.getUser();
        this.modalAddUser.hide();
      }, error => this.snotify.error("Something wrong here", "Error!"));
  }

  saveEditUser() {
    this.userService.updateUser(this.editUser).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.snotify.success("Successfully Edit User", "Success");
        this.modalEditUser.hide();
        this.getUser();
      }, error => this.snotify.error('Edit User has failed', "Error!"));
  }

  // getUser() {
  //   console.log('Page: ', this.pagination);
  //   this.spinnerService.show();
  //   this.userService.getUsers(this.account, this.isActive, this.pagination.currentPage, this.pagination.itemsPerPage)
  //     .subscribe(res => {
  //       this.users = res.result;
  //       console.log("User: ", this.users)
  //       this.pagination = res.pagination;

  //       this.spinnerService.hide();
  //     });
  // }

  // search() {
  //   this.pagination.currentPage = 1;
  //   this.getUser();
  // }


  // saveAddUser() {
  //   this.userService.addUser(this.addUser)
  //     .subscribe(() => {
  //       this.snotify.success('Add user success!');
  //       this.spinnerService.hide();
  //       this.getUser();
  //     }, error => {
  //       this.snotify.error('Fail add user!');
  //       this.spinnerService.hide();
  //     });
  // }

  // saveAuthorizationUser() {
  //   const updateRoleByUser = this.listRoleByUser.filter(item => {
  //     return item.status === true;
  //   });
  //   this.spinnerService.show();
  //   this.userService.updateRoleByUser(this.userAuthorizationAccount, updateRoleByUser)
  //     .subscribe(() => {
  //       this.snotify.success('Update role user success!');
  //       this.spinnerService.hide();
  //       this.authorizationModal.hide();
  //     }, error => {
  //       this.snotify.error('Fail update role user!');
  //       this.spinnerService.hide();
  //     });
  // }

  // saveEditUser() {
  //   this.spinnerService.show();
  //   this.userService.updateUser(this.editUser)
  //     .subscribe(() => {
  //       this.snotify.success('Update user success!');
  //       this.spinnerService.hide();
  //       this.modalEditUser.hide();
  //       this.getUser();
  //     }, error => {
  //       this.snotify.error('Fail update user!');
  //       this.spinnerService.hide();
  //     });
  // }
}
