import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    PaginationModule.forRoot(),
    UserRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }
