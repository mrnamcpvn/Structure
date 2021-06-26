import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { Pagination } from '../../../_core/_models/pagination';
import { RoleByUser } from '../../../_core/_models/role-by-user';
import { AddUser, User } from '../../../_core/_models/user';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { DestroyService } from '../../../_core/_services/destroy.service';
import { SweetAlertService } from '../../../_core/_services/sweet-alert.service';
import { UserService } from '../../../_core/_services/user.service';
import { commonPerFactory } from '../../../_core/_utility/common-fer-factory';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  //khai báo biến
  imageUser: any = '';
  registrationForm = this.fb.group({
    file: [null]
  });
  user: any = {};
  users: AddUser[] = [];
  account: string = '';
  isActive: string = 'all';
  imageUserUrl = commonPerFactory.imageUserUrl;
  removeUpload: boolean = false;
  editFile: boolean = true;
  file: File;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  currentUser: User = JSON.parse(localStorage.getItem('userSmartTooling'));
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
    private modalService: BsModalService,
    private cd: ChangeDetectorRef,
    public fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    private destroyService: DestroyService,
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
    this.userService.addUser(this.addUser, this.file)
      .subscribe(() => {
        this.alertifyService.success('Add user success!');
        this.spinnerService.hide();
        this.getUser();
        this.clearUser();
      }, error => {
        this.alertifyService.error('Fail add user!');
        this.spinnerService.hide();
      });
  }

  clear() {
    this.account = '' ;
    this.isActive = 'all';
    this.getUser();
  }

  search() {
    this.pagination.currentPage = 1;
    this.getUser();
  }

  removeUploadedFile() {
    if (this.user.image === undefined)
      this.user.image = null;
    this.imageUser = this.user.image !== null ? this.imageUserUrl + this.user.image
                                              : commonPerFactory.imageUserDefault;
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }



  uploadFile(event) {
    this.file = event.target.files[0];
    let reader = new FileReader(); // HTML5 FileReader API
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(this.file);

      //When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUser = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  edituser(){
    this.spinnerService.show();
      if (this.user.password === undefined)
        this.user.password = null;
      if (this.file === undefined)
        this.file = null;
      this.userService.editUser(this.user, this.file)
        .pipe(takeUntil(this.destroyService.destroys$))
        .subscribe(res => {
          this.spinnerService.hide();
          if (this.user.account === this.currentUser.account) {
            this.sweetAlertService.warning('Wating', 'User updating, please wating page reload');
            this.getUser();
          }
          else if (res.success) {
            this.getUser();
            this.sweetAlertService.success('done', res.message);
            this.modalEditUser.hide();
          } else {
            this.sweetAlertService.error('Error!', res.message);
          }
        }, error => {
          console.log(error);
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
  saveAuthorization() {
    const updateRoleByUser = this.listRoleByUser.filter(item => {
      return item.status === true;
    });
    this.spinnerService.show();
    this.userService.updateRoleByUser(this.userAuthorizationAccount, updateRoleByUser)
    .subscribe(() => {
      this.alertifyService.success('Update role user success!');
      this.spinnerService.hide();
      this.authorizationModal.hide();
    }, error => {
      this.alertifyService.error('Fail update role user!');
      this.spinnerService.hide();
    });
  }

  delete(account: string){
    // debugger
    this.sweetAlertService.confirm('Delete User?', 'are you sure you want to delete this record', () =>{
      const currentUser: any = JSON.parse(localStorage.getItem('userSmartTooling'));
      // debugger
      if(account === currentUser.username)
      this.sweetAlertService.error('The current user cannot be deleted.');
      else{
        this.spinnerService.show();
        this.userService.deleteUser(account).subscribe(res =>{
          this.spinnerService.hide();
          if(res.success){
            this.getUser();
            this.sweetAlertService.success('done', res.message);
          }
          else{
            this.sweetAlertService.error('fail', res.message);
          } 
        }, error =>{
          console.log(error);
          this.spinnerService.hide();
        });
      }
    });
  }

  clearUser(){
    this.addUser = new AddUser();
  }
}
