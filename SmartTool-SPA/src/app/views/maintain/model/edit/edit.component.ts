import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { Model } from '../../../../_core/_models/model';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ModelService } from '../../../../_core/_services/model.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  modelTypeList: Array<Select2OptionData>;
  modelLocal: Model = JSON.parse(localStorage.getItem('modelLocalEdit'));
  url: string = environment.imageUrl;
  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.getAllModelType();
    localStorage.removeItem('modelLocalEdit');
  }

  loadData(){
    this.modelLocal;
  }

  getAllModelType(){
    this.modelService.getModelType().subscribe(
      (res) =>{
        this.modelTypeList =res.map((item) =>{return{ id: item.id, text: item.name};});
      }
    );
  }
  backList() {
    this.router.navigate(["/maintain/model/list"]);
  }

  saveMd(){
    this.modelService.updateModel(this.modelLocal).subscribe(
      () =>{
        this.router.navigate(["/maintain/model/list"]);
        this.alertify.success("Edit succeed!");
      }, error =>{
        this.alertify.error("can not Update Model!");
      }
    )
  }

  onSelectFile(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      var file = event.target.files[0];
      var title = event.target.files[0].name.split(".").pop();
      var fileZise = event.target.files[0].size;
      if (
        title == "jpg" ||
        title == "jpeg" ||
        title == "png" ||
        title == "JPG" ||
        title == "JPEG" ||
        title == "PNG"
      ) {
        if (fileZise <= 5242880) {
          reader.onload = (event) => {
            this.url = event.target.result.toString();
            this.modelLocal.model_picture = event.target.result.toString();
          };
        } else {
          this.alertify.error("Image size is larger than 5mb");
        }
      }
    }
  }
  }