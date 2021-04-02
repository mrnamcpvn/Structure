import { AlertUtilityService } from './../../../_core/_services/alertUtility.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from '../../../_core/_models/pagination';
import { RoleByUser } from '../../../_core/_models/role-by-user';
import { AddUser, User } from '../../../_core/_models/user';
import { UserService } from '../../../_core/_services/user.service';
import { Subject, Subscription } from 'rxjs';
import { UserQuery } from '../../../_core/_queries/user.query';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // userToAdd: AddUser = {} as AddUser;
  users: User[] = [];
  account: string = '';
  isActive: string = 'all';
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  addUser: AddUser = new AddUser();

  modalRef: BsModalRef;
  @ViewChild('authorizationModal', { static: false }) authorizationModal: ModalDirective;
  userAuthorizationAccount: string = '';
  userAuthorizationName: string = '';
  listRoleByUser: RoleByUser[] = [];
  subscription: Subscription = new Subscription();
  private readonly unsubscribe$: Subject<void> = new Subject();
  editUser: AddUser = new AddUser();

  @ViewChild('modalEditUser', { static: false }) modalEditUser: ModalDirective;

  constructor(
    private userService: UserService,
    private userQuery: UserQuery,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertUtilityService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.queryUser();
    this.getUsers();
  }

  queryUser() {
    this.subscription.add(
      this.userQuery.selectAll().subscribe(users => this.users = users)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUsers() {
    console.log('Page: ', this.pagination);
    this.spinnerService.show();
    this.userService.getUsers(this.account, this.isActive, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(res => {
        this.users = res.result;
        this.pagination = res.pagination;
        this.spinnerService.hide();
      });
  }

  search() {
    this.pagination.currentPage = 1;
    this.getUsers();
  }

  saveAddUser() {
    this.spinnerService.show();
    this.userService.addUser(this.addUser)
      .subscribe(() => {
        this.alertifyService.success('Add user success!', 'Success');
        this.spinnerService.hide();
        this.getUsers();
      }, error => {
        this.alertifyService.error('Fail add user!', 'Error');
        this.spinnerService.hide();
      });
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
    const updateRoleByUser = this.listRoleByUser.filter(item => {
      return item.status === true;
    });
    this.spinnerService.show();
    this.userService.updateRoleByUser(this.userAuthorizationAccount, updateRoleByUser)
    .subscribe(() => {
      this.alertifyService.success('Update role user success!', 'Success');
      this.spinnerService.hide();
      this.authorizationModal.hide();
    }, error => {
      this.alertifyService.error('Fail update role user!', 'Error');
      this.spinnerService.hide();
    });
  }

  saveEditUser() {
    this.spinnerService.show();
    this.userService.updateUser(this.editUser)
      .subscribe(() => {
        this.alertifyService.success('Update user success!', 'Success');
        this.spinnerService.hide();
        this.modalEditUser.hide();
        this.getUsers();
      }, error => {
        this.alertifyService.error('Fail update user!', 'Error');
        this.spinnerService.hide();
      });
  }

  pageChanged(event: any): void {
    console.log(event);
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

  openModalEditUser(user: AddUser) {
    this.editUser = user;
    this.modalEditUser.show();
  }

}
