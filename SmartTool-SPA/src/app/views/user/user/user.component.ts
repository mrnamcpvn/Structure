import { Route } from "@angular/compiler/src/core";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "../../../_core/_models/pagination";
import { RoleByUser } from "../../../_core/_models/role-by-user";
import { AddUser, User } from "../../../_core/_models/user";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { UserService } from "../../../_core/_services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  users: AddUser[] = [];
  account: string = "";
  isActive: string = "all";
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  addUser: AddUser = new AddUser();

  modalRef: BsModalRef;
  @ViewChild("authorizationModal", { static: false })
  authorizationModal: ModalDirective;
  userAuthorizationAccount: string = "";
  userAuthorizationName: string = "";
  listRoleByUser: RoleByUser[] = [];

  editUser: AddUser = new AddUser();
  @ViewChild("modalEditUser", { static: false }) modalEditUser: ModalDirective;

  constructor(
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    console.log("Page: ", this.pagination);
    this.spinnerService.show();
    this.userService
      .getUsers(
        this.account,
        this.isActive,
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe((res) => {
        this.users = res.result;
        console.log("User: ", this.users);
        this.pagination = res.pagination;
        this.spinnerService.hide();
      });
  }

  search() {
    this.pagination.currentPage = 1;
    this.getUser();
  }

  saveAddUser() {
    this.spinnerService.show();
    this.userService.addUser(this.addUser).subscribe(
      () => {
        this.alertifyService.success("Add user success!");
        this.spinnerService.hide();
        this.getUser();
      },
      (error) => {
        this.alertifyService.error("Fail add user!");
        this.spinnerService.hide();
      }
    );
    this.router.navigate(["/user/list"]);
  }

  openModalAuthorization(account: string, name: string) {
    this.userAuthorizationAccount = account;
    this.userAuthorizationName = name;
    this.userService
      .getRoleByUser(this.userAuthorizationAccount)
      .subscribe((res) => {
        this.listRoleByUser = res;
        this.authorizationModal.show();
      });
  }

  saveAuthorizationUser() {
    const updateRoleByUser = this.listRoleByUser.filter((item) => {
      return item.status === true;
    });
    this.spinnerService.show();
    this.userService
      .updateRoleByUser(this.userAuthorizationAccount, updateRoleByUser)
      .subscribe(
        () => {
          this.alertifyService.success("Update role user success!");
          this.spinnerService.hide();
          this.authorizationModal.hide();
        },
        (error) => {
          this.alertifyService.error("Fail update role user!");
          this.spinnerService.hide();
        }
      );
  }

  saveEditUser() {
    this.spinnerService.show();
    this.userService.updateUser(this.editUser).subscribe(
      () => {
        this.alertifyService.success("Update user success!");
        this.spinnerService.hide();
        this.modalEditUser.hide();
        this.getUser();
      },
      (error) => {
        this.alertifyService.error("Fail update user!");
        this.spinnerService.hide();
      }
    );
  }

  pageChanged(event: any): void {
    console.log(event);
    this.pagination.currentPage = event.page;
    this.getUser();
  }

  openModalEditUser(user: AddUser) {
    this.editUser = user;
    this.modalEditUser.show();
  }

  clear() {
    this.account = "";
    this.pagination.currentPage = 1;
    this.getUser();
  }
}
