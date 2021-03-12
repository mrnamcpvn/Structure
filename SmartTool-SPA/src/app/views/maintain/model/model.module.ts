import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelRoutingModule } from './model-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    ModelRoutingModule,
    HttpClientModule,
    PaginationModule.forRoot(),
  ],
  declarations: [
    AddComponent,
    EditComponent,
    ModelListComponent
  ]
})
export class ModelModule {}
