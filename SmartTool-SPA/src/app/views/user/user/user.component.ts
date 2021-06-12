import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from '../../../_core/_models/pagination';
import { RoleByUser } from '../../../_core/_models/role-by-user';
import { AddUser } from '../../../_core/_models/user';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { UserService } from '../../../_core/_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  //khai báo biến
  users: AddUser[] = [];
  account: string = '';
  isActive: string = 'all';
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  addUser: AddUser = new AddUser();
  editUser: AddUser = new AddUser();
  modalRef: BsModalRef;
  @ViewChild('modalEditUser', { static: false }) modalEditUser: ModalDirective;

  userAuthorizationAccount: string = '';
  userAuthorizationName: string='';
  listRoleByUser: RoleByUser[] = [];
  @ViewChild('authorizationModal', { static: false }) authorizationModal: ModalDirective;
  constructor(
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser() {
    console.log('Page: ',this.pagination);
    this.spinnerService.show();
    this.userService.getUsers(this.account, this.isActive, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(res => {
        this.users = res.result;
        console.log("User: ", this.users)
        this.pagination = res.pagination;
        this.spinnerService.hide();
      });
  }

  adduser(){
    this.spinnerService.show();
    this.userService.addUser(this.addUser)
      .subscribe(() => {
        this.alertifyService.success('Add user success!');
        this.spinnerService.hide();
        this.getUser();
      }, error => {
        this.alertifyService.error('Fail add user!');
        this.spinnerService.hide();
      });
  }

  clear() {
    this.account = ':))' ;
    this.isActive = 'all';
  }

  search() {
    this.pagination.currentPage = 1;
    this.getUser();
  }

  edituser(){
    this.spinnerService.show();
    this.userService.editUser(this.editUser)
      .subscribe(() => {
        this.alertifyService.success('Add user success!');
        this.spinnerService.hide();
        this.getUser();
      }, error => {
        this.alertifyService.error('Fail add user!');
        this.spinnerService.hide();
      });
  }

  openModalEditUser(user: AddUser) {
    this.editUser = user;
    this.modalEditUser.show();
  }

  pageChanged(event: any): void {
    console.log(event);
    this.pagination.currentPage = event.page;
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
}
